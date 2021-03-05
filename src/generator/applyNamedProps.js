import { cap } from '../helpers/cap';
import { getBps, mq } from '../mq';
import getVariables from './getVariables';
import parseNestedProps from './parseNestedProps';
import setCssProp from './setCssProp';

const applyNamedProp = (allProps, { list, cssProp, prefix = '', units }) => {
  const { theme, ...props } = allProps;

  const variables = getVariables(list, theme);

  if (!variables) {
    return null;
  }

  const propKeys = Object.keys(props);
  const variableKeys = Object.keys(variables);
  const withNestedProps = variableKeys.reduce((result, key) => result || typeof variables[key] === 'object', false);

  // sets an array
  // with matched props
  // from the variables list
  let match = variableKeys.filter(variable =>
    propKeys.find(prop => `${prop}` === `${prefix}${prefix ? cap(variable) : variable}`)
  );

  if (!match.length && !withNestedProps) {
    return;
  }

  let parsedProps = null;

  // if there's no match
  // will try to find for
  // camelCased separations
  // grey.light will be greyLight
  if (!match.length) {
    // try to find deep val
    parsedProps = parseNestedProps(variables);
    match = Object.keys(parsedProps).filter(variable =>
      propKeys.find(prop => `${prop}` === `${prefix}${prefix ? cap(variable) : variable}`)
    );

    if (!match.length) {
      return;
    }
  }

  const matchIndex = match.length - 1;

  const propName = `${prefix}${prefix ? cap(match[matchIndex]) : match[matchIndex]}`;
  const propVal = props[propName];
  const value = !parsedProps ? variables[match[matchIndex]] : parsedProps[match];

  const breakpoints = getBps({ theme });

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
    : setCssProp(cssProp, value, units);
};

const applyNamedProps = props => {
  const namedProps = props?.theme?.generator?.namedProps;

  if (!namedProps.length) {
    return;
  }

  return namedProps.map(namedProp => applyNamedProp(props, namedProp));
};

export default applyNamedProps;
