import { css } from 'styled-components'

// helper function to
// returns css
const setCssProp = (cssProp, value, units) => css`
  ${cssProp}: ${value}${typeof value === 'number' && !!units ? units : ''};
`

export default setCssProp
