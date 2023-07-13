import { config } from '../constants/config';
import { mq } from './mq';
import css from '../utils/css';

type Options = {
  useTransientPrefix?: boolean;
};

const defaultOptions: Options = {
  useTransientPrefix: true
};

const { isArray } = Array;

const methods = ['from', 'upTo'] as const;

export const applyNamedProp =
  (propName: string, styles: any | any[], options?: Options) => (props: { [prop: string]: any }) => {
    const { useTransientPrefix } = { ...defaultOptions, ...options };
    const { transientPrefix } = props?.theme?.config || config.transientPrefix;
    const breakpointsArray = Object.keys(props?.theme?.breakpoints);
    const prefix = useTransientPrefix ? transientPrefix || '' : '';

    const matchStyle = isArray(styles) ? styles[0] : styles;
    const defaultStyle = isArray(styles) && styles[1];

    const propValue = props[`${prefix}${propName}`];

    if (propValue === undefined || propValue === null) {
      return '';
    }

    if (typeof propValue === 'boolean') {
      return propValue ? matchStyle || '' : defaultStyle || '';
    }

    if (
      typeof propValue === 'object' &&
      Object.keys(propValue).find(
        method => methods.includes(method as any) && breakpointsArray.includes(propValue?.[method])
      )
    ) {
      return css`
        ${defaultStyle};

        ${methods.reduce((result: any, method) => {
          const breakpoint: string | undefined = propValue?.[method] || undefined;

          if (!breakpointsArray.includes(breakpoint || '')) {
            return result;
          }

          return mq[method](breakpoint as string, matchStyle);
        }, [])}
      `;
    }
  };
