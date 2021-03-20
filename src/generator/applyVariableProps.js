import { getBps, mq } from '../mq';
import { isInvalid } from '../helpers/isInvalid';
import { nulify } from '../helpers/nulify';
import getProp from './getProp';
import getVariables from './getVariables';
import setCssProp from './setCssProp';

const applyVariableProp = (props, { name, list, helperFn, cssProp, units }) => {
  // check if props and name is being
  // passed and if prop exists
  if (!name || !props || props[name] === undefined) {
    return;
  }

  // sets the variables list
  const variables = getVariables(list, props.theme);

  // internal helper fn that
  // will be returned
  const setCss = propVal => {
    // check if there's an helper
    // function with the prop name
    const useFunction = !!helperFn && typeof helperFn === 'function';

    // if no val, just
    // returns null
    if (isInvalid(propVal) && !useFunction) {
      return null;
    }

    // check if the val is a string
    // or if splitted, have more than
    // one arg. If yes, just returns an
    // array nulified to use with the
    // helper fns from polished
    // ex: "10 0 null auto" will be
    // [10, 0, null, 'auto']
    // if it's not multi arg, just return
    // the unchanged value
    const prop =
      typeof propVal === 'string' && propVal.split(' ').length > 1 ? propVal.split(' ').map(p => nulify(p)) : propVal;

    if (!useFunction) {
      return typeof prop === 'number' || !variables
        ? setCssProp(cssProp, prop, units)
        : setCssProp(cssProp, getProp({ key: prop, list: variables, units }));
    }

    return Array.isArray(prop)
      ? helperFn(
          ...prop.map(propArg =>
            // eslint-disable-next-line no-nested-ternary
            !Number.isNaN(+propArg) && propArg > 0 && typeof propArg !== 'boolean'
              ? `${propArg}${units}`
              : typeof propArg === 'boolean'
              ? undefined
              : propArg
          )
        )
      : helperFn(
          // eslint-disable-next-line no-nested-ternary
          !Number.isNaN(+prop) && typeof prop !== 'boolean'
            ? `${+prop}${units}`
            : typeof prop === 'boolean'
            ? undefined
            : prop
        );
  };

  // check if the value of the prop
  // is string or number and if yes,
  // returns the internal setCss fn
  if (typeof props[name] === 'string' || typeof props[name] === 'number' || typeof props[name] === 'boolean') {
    return setCss(props[name]);
  }

  // if the value is not a string, number
  // or an object, we don't want it, so
  // we return a console log saying that
  if (typeof props[name] !== 'object') {
    /* eslint-disable-next-line */
    return console.log(`wrong format in prop ${name}: `, props[name])
  }

  // sets the prop breakpoints keys
  const propKeys = Object.keys(props[name]);

  // get breakpoints using
  // styled-helper-mq breakpoint fn
  const breakpoints = getBps(props);

  // sets the theme breakpoints keys
  const bpKeys = Object.keys(breakpoints);
  // reduce the prop breakpoints returning a
  // parsed arr to be iterated
  const bps = propKeys.reduce((acc, bp) => {
    const breakpoint = bpKeys.find(b => bp === b);

    return breakpoint ? [...acc, { breakpoint: breakpoints[breakpoint], prop: props[name][bp] }] : acc;
  }, []);

  // returns the setCss with breakpoints
  return bps.length
    ? bps
        .sort((a, b) => a.breakpoint - b.breakpoint)
        .reduce((acc, bp) => [...acc, mq.from(bp.breakpoint, setCss(bp.prop))], [])
    : null;
};

// iterates over the
// variable props config
const applyVariableProps = props => {
  const variableProps = props?.theme?.generator?.variableProps;

  if (!variableProps?.length) {
    return;
  }

  return variableProps.map(variableProp => applyVariableProp(props, variableProp));
};

export { applyVariableProp };

export default applyVariableProps;
