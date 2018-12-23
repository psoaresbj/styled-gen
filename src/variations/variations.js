import { css } from 'styled-components'

const getVariations = (props, variations) => {
  // sets an array with all
  // props
  const propsArr = Object.keys(props)
  // sets an array with all
  // variations keys
  const variationsArr = Object.keys(variations)

  // Check if there's any
  // prop that match any
  // variation obj key
  // and returns that key
  const variationName = variationsArr.reduce((acc, v) => propsArr.find(prop => props[v] && prop === v) || acc, [])

  return variations[variationName]
    // if there's a variation with
    // the matched key returns it
    ? variations[variationName]
    // if there isn't any variation
    // with the matched key
    : variations.default
      // if there's a `default`
      // returns that
      ? variations.default
      // if there's any match
      // returns null
      : null
}

// wrapping the getVariations
// in the styled component css
// helper fn to access the
// component props
const variations = variations => css`
    ${props => getVariations(props, variations)};
`

export default variations
