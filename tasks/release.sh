#!/usr/bin/env sh
bold=$(tput bold)
normal=$(tput sgr0)

abort_release() {
  echo "\nAborting release\n"
  exit 1
}

ask() {
  local input_ps3=$2
  local fallback_ps3="Select option: "

  printf "\n${bold}$1\n${normal}"
  PS3="${input_ps3:-$fallback_ps3}"
}

check_branch() {
  local current_branch="$(git rev-parse --abbrev-ref HEAD)"
  local main_branch="main"

  if [[ "$current_branch" != "$main_branch" ]]; then
    ask "You are not in the correct branch" "Do you want to checkout to $main_branch? "
    select should_checkout in "Yes" "No"; do
        case $should_checkout in
            "Yes" ) git checkout $main_branch; break;;
            "No"  ) abort_release;;
        esac
    done
  fi

  # Pull latest changes
  git pull origin $main_branch
}

get_current_version() {
  # Get current version from package.json
  local current_version=$(cat package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')

  echo $current_version
}

get_release_version() {
  local input_version=$1

  if [[ "$input_version" != "" ]]; then
    echo "$input_version"
    return
  fi

  local current_version=$(get_current_version)
  local next_version=`echo $current_version | awk -F. '/[0-9]+\./{$NF++;print}' OFS=.`

  read -p "Enter new version or press enter to use $next_version: " selected_version

  if [[ "$selected_version" == "" ]]; then
    echo $next_version
    return
  fi

  echo $selected_version
}

release() {
  # check if it's in the correct branch
  check_branch

  release_version="$(get_release_version $1)"

  # Create release branch.
  branch_name=release/$release_version

  # If branch exists asks if should be replaced
  if [ $local_branch_exists == "Yes" ]; then
    ask "Branch $branch_name already exists" "Do you want to replace it? "
    select should_delete_branch in "Yes" "No"; do
        case $should_delete_branch in
            "Yes" ) git branch -D $branch_name; break;;
            "No"  ) abort_release;;
        esac
    done
  fi

  git checkout -b $branch_name

  # Clean node_modules and shrinkwrap.
  rm -rf node_modules

  # Set node version
  nvm use

  # Clean install dependencies.
  yarn

  # Build
  yarn build


  # Bump version using `npm`.
  yarn version --no-git-tag-version --new-version ${release_version:-patch}

  # Get the new version number.
  local version=`grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[", ]//g'`

  # Generate changelog
  auto-changelog -p && git add CHANGELOG.md

  # Add files to commit
  git add package.json CHANGELOG.md

  # Commit release with new version.
  git commit -m "Release ${version}"

  # Ask if should push changes to the branch
  ask "Changes are not yet pushed to the remote origin." "Do you want to push changes to origin $branch_name?"
  select should_push in "Yes" "Yes, with -f" "No"; do
    case $should_push in
      "Yes"           ) git push origin $branch_name; break;;
      "Yes, with -f"  ) git push origin $branch_name -f; break;;
      "No"            ) break;;
    esac
  done
}

release $1