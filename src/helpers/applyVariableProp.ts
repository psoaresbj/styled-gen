import { config } from '../constants/config';
import { mq } from './mq';
import { sortBreakpoints } from '../utils/sortBreakpoints';

type BreakpointEntry = { breakpoint: string; value: number };

type Options = {
  useTransientPrefix?: boolean;
};

type Prop = string | { [key: string]: string };

const defaultOptions: Options = {
  useTransientPrefix: true
};

const { isArray } = Array;

export const applyVariableProp =
  (propName: Prop, transformer: Function, options?: Options) => (props: { [prop: string]: any }) => {
    const { useTransientPrefix } = { ...defaultOptions, ...options };
    const { transientPrefix } = props?.theme?.config || config.transientPrefix;
    const breakpoints = props?.theme?.breakpoints;
    const prefix = useTransientPrefix ? transientPrefix || '' : '';

    const propValue = typeof propName === 'string' ? props[`${prefix}${propName}`] : propName;

    if (propValue === undefined || propValue === null) {
      return '';
    }

    if (typeof propValue === 'boolean' || isArray(propValue) || ['string', 'number'].includes(typeof propValue)) {
      return transformer(propValue, props?.theme);
    }

    const sortedBreakpoints = sortBreakpoints(breakpoints, { asArray: true }) as BreakpointEntry[];

    return sortedBreakpoints.reduce((result: any, { breakpoint, value }, index) => {
      if (!index && propValue[breakpoint] !== undefined && !value) {
        return [...result, transformer(propValue[breakpoint], props?.theme)];
      }

      if (propValue[breakpoint] !== undefined) {
        return [...result, mq.from(breakpoint, transformer(propValue[breakpoint], props?.theme))];
      }

      return result;
    }, []);
  };
