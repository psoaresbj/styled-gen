import { Breakpoints } from '../types';

export const sortBreakpoints = (breakpoints: Breakpoints, { asArray } = { asArray: false }): any => {
  const sorted = Object.entries(breakpoints || {}).sort(([, valueA], [, valueB]) => valueA - valueB);

  if (asArray) {
    return sorted.map(([breakpoint, value]) => ({ breakpoint, value }));
  }

  return sorted.reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
};
