/* eslint-disable no-nested-ternary */
import { ParsedProp, Theme, Units } from '../types';
import { mq } from '../helpers/mq';
import { sortBreakpoints } from './sortBreakpoints';
import css from './css';

type MqMethodsKeys = keyof typeof mq;

const isCssValue = (value: any) => typeof value === 'string' || typeof value === 'number';

const getValueWithUnits = (value: string | number, units?: Units) => {
  if (isNaN(+value)) {
    return value;
  }

  return `${+value}${units || ''}`;
};

const parseHelperFnArguments = (args?: string, units?: Units) =>
  (args?.toString() || '').split(' ').map((value: any) => getValueWithUnits(value, units));

const applyBooleanProp = (parsedProp: ParsedProp) => {
  const { cssProp, cssValue, helperFn, helperFnArgStr, units } = parsedProp;

  if (!!helperFn && !!helperFnArgStr) {
    return helperFn(...parseHelperFnArguments(helperFnArgStr, units));
  }

  if (!isCssValue(cssValue)) {
    return;
  }

  return `${cssProp}: ${getValueWithUnits(cssValue as string | number, units)};`;
};

const applyPlainProp = (parsedProp: ParsedProp) => {
  const { cssProp, list, helperFn, propValue, units } = parsedProp;

  const value = typeof list?.[propValue] !== 'undefined' ? list[propValue] : propValue;

  if ((!cssProp && !helperFn) || (value !== 0 && !value)) {
    return;
  }

  if (!!helperFn) {
    return helperFn(...parseHelperFnArguments(value, units));
  }

  return `${cssProp}: ${getValueWithUnits(value, units)};`;
};

const applyMqProps = (parsedProp: ParsedProp, breakpoints?: { breakpoint: string; value: number }[]) => {
  const { propValue } = parsedProp;

  const boolStyles =
    Object.entries(propValue).reduce((result: any, [key, value]) => {
      if (['from', 'upTo'].includes(key)) {
        return [...result, (mq[key as MqMethodsKeys] as any)(value, applyBooleanProp(parsedProp))];
      }

      return result;
    }, []) || [];

  const bpsStyles =
    (breakpoints || []).reduce((result: any, { breakpoint }, index) => {
      if (propValue[breakpoint] !== 0 && !propValue[breakpoint]) {
        return result;
      }

      return !index
        ? [...result, applyPlainProp({ ...parsedProp, propValue: propValue[breakpoint] })]
        : [...result, mq.from(breakpoint as any, applyPlainProp({ ...parsedProp, propValue: propValue[breakpoint] }))];
    }, []) || [];

  return [...bpsStyles, ...boolStyles];
};

export const applyParsedProps = (parsedProps: ParsedProp[], theme?: Theme) => {
  const style = parsedProps.reduce((result: any, parsedProp) => {
    const { cssProp, helperFn, propValue } = parsedProp;

    // apply plain props
    if (isCssValue(propValue) && (cssProp || helperFn)) {
      const currentStyle = applyPlainProp(parsedProp);

      return currentStyle ? [...result, currentStyle] : result;
    }

    // apply booleanProps
    if (typeof propValue === 'boolean') {
      const currentStyle = applyBooleanProp(parsedProp);

      return currentStyle && propValue ? [...result, currentStyle] : result;
    }

    // apply mqProps
    if (
      Object.keys(propValue || {}).find(key => ['from', 'upTo', ...Object.keys(theme?.breakpoints || {})].includes(key))
    ) {
      const breakpoints = sortBreakpoints(theme?.breakpoints || {}, { asArray: true }) || [];

      const currentStyle = applyMqProps(parsedProp, breakpoints);

      return currentStyle.length ? [...result, currentStyle] : result;
    }

    return result;
  }, []);

  return css`
    ${style};
  `;
};
