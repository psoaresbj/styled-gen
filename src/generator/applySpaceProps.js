import { applyVariableProp } from './applyVariableProps'
import getVariables from './getVariables'

// sets an array with all
// side options
const sidesArr = ['top', 'right', 'bottom', 'left']

// arguments
// props: obj that cames from component
// or may be added manually
//
// {
//    prop: string of the prop name
//    list: the list of variables (if string will try to fetch theme[list])
//    units: string to add to the end of css value, if number. ex: px, rem, em, %
// }
const applySpaceProp = (props, {prop, list, units}) => {
  // check if props and name is being
  // passed and if prop exists
  if (!prop || !props) { return }

  // sets the first letter
  // of the prop
  const firstLetter = prop.charAt(0)

  // sets the variables list
  // is ok if returns undefined
  // majorly, this feature is to
  // be used with number values
  const variables = getVariables(list, props.theme)

  // iterates over all sides
  return sidesArr.map(side => {
    // prepare the object to
    // be passed to the
    // applyVariableProp fn
    const applyObj = {
      // the first letter
      // of the prop + the
      // first letter of the
      // side
      name: `${firstLetter}${side.charAt(0)}`,
      // prop-side
      // ex: margin-left
      cssProp: `${prop}-${side}`,
      // list
      list: variables,
      // units
      // returs rem
      // if there's none
      units: units || 'rem'
    }

    // returns the helper fn
    return applyVariableProp(props, applyObj)
  })
}

// iterates over the
// space props config
const applySpaceProps = props => !!props &&
  !!props.theme &&
  !!props.theme.generator &&
  !!props.theme.generator.spaceProps &&
  props.theme.generator.spaceProps.map(spaceProp => applySpaceProp(props, spaceProp))

export default applySpaceProps
