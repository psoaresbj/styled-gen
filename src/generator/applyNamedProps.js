import setCssProp from './setCssProp'
import parseNestedProps from './parseNestedProps'
import getVariables from './getVariables'
import mq, { getBps } from '../mq'

// helper fn to return string with
// first letter uppercased
const cap = str => str.charAt(0).toUpperCase() + str.slice(1)

// arguments
// props: obj that cames from component
// or may be added manually
//
// {
//    list: the list of variables (if string will try to fetch theme[list])
//    cssProp: string. ex: color, background-color, font-family
//    suffix: string to form the prop to use. ex: colorPrimary
//    units: string to add to the end of css value, if number. ex: px, rem, em, %
// }
const applyNamedProp = (props, { list, cssProp, suffix = '', units }) => {
  // set the variables list
  const variables = getVariables(list, props.theme)

  // if no variables
  // breaks
  if (!variables) {
    return null
  }

  // set array of prop keys
  const propKeys = Object.keys(props)

  // sets an array
  // with matched props
  // from the variables list
  let match = Object.keys(variables).filter(variable => propKeys.find(prop => `${prop}` === `${suffix}${suffix ? cap(variable) : variable}`))

  let parsedProps = null

  // if there's no match
  // will try to find for
  // camelCased separations
  // grey.light will be greyLight
  if (!match.length) {
    // try to find deep val
    parsedProps = parseNestedProps(variables)
    match = Object.keys(parsedProps).filter(variable => propKeys.find(prop => `${prop}` === `${suffix}${suffix ? cap(variable) : variable}`))

    // if still there's no match
    // just returns null
    if (!match.length) {
      return null
    }
  }

  // sets the index of the filter
  const matchIndex = match.length - 1

  // sets the propName
  const propName = `${suffix}${suffix ? cap(match[matchIndex]) : match[matchIndex]}`

  // sets the prop value
  const propVal = props[propName]

  // sets the css value to use
  const value = !parsedProps ? variables[match[matchIndex]] : parsedProps[match]

  // get breakpoints using
  // styled-helper-mq breakpoint fn
  const breakpoints = getBps(props)

  // return the styled-component
  // css fn with the matched val
  // or if prop has a string value
  // that matches with a breakpoint
  // returns the helper that sets
  // the css only for that breakpoint
  // ex: fontWeightBold="md" -> will only
  // be applyed in screens wider than
  // breakpoints.md
  return typeof propVal === 'string' && Object.keys(breakpoints).find(bp => bp === propVal)
    ? mq.from(propVal, setCssProp(cssProp, value, units))
    : setCssProp(cssProp, value, units)
}

// iterates over the
// named props config
const applyNamedProps = props => !!props &&
  !!props.theme &&
  !!props.theme.generator &&
  !!props.theme.generator.namedProps &&
  props.theme.generator.namedProps.map(namedProp => applyNamedProp(props, namedProp))

export default applyNamedProps
