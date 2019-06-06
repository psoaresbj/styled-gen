import getProp from './getProp'
import setCssProp from './setCssProp'
import getVariables from './getVariables'
import mq, { getBps } from '../mq'

const nulify = val => val === 'null' || val === 'undefined' || val === 'false' ? null : val
const isNotValid = val => val === undefined || val === null || val === false || nulify(val) === null

// arguments
// props: obj that cames from component
// or may be added manually
//
// {
//    name: string of the prop name
//    list: the list of variables (if string will try to fetch theme[list])
//    cssProp: string. ex: color, background-color, font-family
//    units: string to add to the end of css value, if number. ex: px, rem, em, %
// }
const applyVariableProp = (props, {name, list, helperFn, cssProp, units}) => {
  // check if props and name is being
  // passed and if prop exists
  if ((!name || !props) || props[name] === undefined) { return }

  // sets the variables list
  const variables = getVariables(list, props.theme)

  // internal helper fn that
  // will be returned
  const setCss = propVal => {
    // if no val, just
    // returns null
    if (isNotValid(propVal)) { return null }

    // check if the val is a string
    // or if splitted, have more than
    // one arg. If yes, just returns an
    // array nulified to use with the
    // helper fns from polished
    // ex: "10 0 null auto" will be
    // [10, 0, null, 'auto']
    // if it's not multi arg, just return
    // the unchanged value
    const prop = typeof propVal === 'string' && propVal.split(' ').length > 1
      ? propVal.split(' ').map(p => nulify(p))
      : propVal

    // check if there's an helper
    // function with the prop name
    const useFunction = !!helperFn && typeof helperFn === 'function'

    return useFunction
      // if there's a function
      // with the name
      // returns it
      ? Array.isArray(prop)
        // if the value is an array
        // just add it to the function
        // parsing them with units
        ? helperFn(...prop.map(propArg => typeof +propArg === 'number' && propArg > 0 ? `${propArg}${units}` : propArg))
        // if not array, just return
        // prop, appending the units
        // if the value is number
        : helperFn(typeof +prop === 'number' ? `${+prop}${units}` : +prop)
      // if no function
      : typeof prop === 'number' || !variables
        // if no variables or the value is
        // number, returns setCssProp with
        // unchanged val
        ? setCssProp(cssProp, prop, units)
        // if value is a string and there's
        // variables,returns setCssProp with
        // function to try to get value from
        // variables. In the end, if no variable
        // returns the unchanged prop value
        : setCssProp(cssProp, getProp({list: variables, key: prop, units}))
  }

  // check if the value of the prop
  // is string or number and if yes,
  // returns the internal setCss fn
  if (typeof props[name] === 'string' || typeof props[name] === 'number') {
    return setCss(props[name])
  }

  // if the value is not a string, number
  // or an object, we don't want it, so
  // we return a console log saying that
  if (typeof props[name] !== 'object') {
    /* eslint-disable-next-line */
    return console.log(`wrong format in prop ${name}: `, props[name])
  }

  // sets the prop breakpoints keys
  const propKeys = Object.keys(props[name])

  // get breakpoints using
  // styled-helper-mq breakpoint fn
  const breakpoints = getBps(props)

  // sets the theme breakpoints keys
  const bpKeys = Object.keys(breakpoints)
  // reduce the prop breakpoints returning a
  // parsed arr to be iterated
  const bps = propKeys.reduce((acc, bp) => {
    const breakpoint = bpKeys.find(b => bp === b)
    return breakpoint
      ? [...acc, { breakpoint: breakpoints[breakpoint], prop: props[name][bp] }]
      : acc
  }, [])

  // returns the setCss with breakpoints
  return bps.length
    ? bps.sort((a, b) => a.breakpoint - b.breakpoint).reduce((acc, bp) => ([
      ...acc,
      mq.from(bp.breakpoint, setCss(bp.prop))
    ]), [])
    : null
}

// iterates over the
// variable props config
const applyVariableProps = props => !!props &&
!!props.theme &&
!!props.theme.generator &&
!!props.theme.generator.variableProps &&
props.theme.generator.variableProps.map(variableProp => applyVariableProp(props, variableProp))

export {
  applyVariableProp
}

export default applyVariableProps
