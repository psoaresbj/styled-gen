import { Variations } from '../types';
import { mq } from './mq';
import css from '../utils/css';

const { isArray } = Array;

export const variations: any = (variants: Variations | Variations[], useTransientPrefix = true) => {
  if (isArray(variants)) {
    return variants.map((variantObject: Variations) => variations(variantObject, useTransientPrefix));
  }

  return (props: { [prop: string]: any }) => {
    const { transientPrefix } = props?.theme?.config || '';
    const prefix = useTransientPrefix ? transientPrefix || '' : '';
    const variantObject = variants as Variations;

    const variationName = Object.keys(variantObject).find(variant => !!props[`${prefix}${variant}`]);

    if (!variationName) {
      return variantObject?.default || null;
    }

    const propValue = props[`${prefix}${variationName}`];
    const style = variantObject[variationName];

    if (typeof propValue === 'boolean' && !!propValue) {
      return style;
    }

    if (typeof propValue === 'object') {
      const methods = Object.entries(propValue as object).reduce(
        (methodsResult: any[], [key, value]) =>
          key === 'from' || key === 'upTo' ? [...methodsResult, [key, value]] : methodsResult,
        []
      );

      if (methods.length) {
        return css`
          ${variantObject?.default || null};

          ${methods.map(([method, breakpoint]) => mq[method as 'from' | 'upTo'](breakpoint, style))};
        `;
      }
    }

    return variantObject?.default || null;
  };
};
