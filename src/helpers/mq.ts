/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Theme } from '../types';
import { sortBreakpoints } from '../utils/sortBreakpoints';
import css from '../utils/css';

type Props = { [key: string]: any; theme: Theme };

const getBreakpoint = (breakpoint: string | number, props: Props, options?: { isMax?: Boolean }) => {
  if (typeof breakpoint === 'number') {
    return `${breakpoint - (options?.isMax ? 1 / 16 : 0)}em`;
  }

  const breakpointValue = props?.theme?.breakpoints?.[breakpoint as string];

  if (typeof breakpointValue !== 'undefined') {
    return `${breakpointValue - (options?.isMax ? 1 / 16 : 0)}em`;
  }

  return breakpoint || '100%';
};

export const mq = {
  // variable methods
  between: (breakpoint1: string | number, breakpoint2: string | number, style: any) => (props: Props) => {
    /* eslint-disable prettier/prettier */
    return css`
      @media only screen and (min-width: ${(props: Props) => getBreakpoint(breakpoint1, props)}) and (max-width: ${(props: Props) => getBreakpoint(breakpoint1, props, { isMax: true })}) {
        ${style};
      }
    `;
    /* eslint-enable prettier/prettier */
  },

  from: (breakpoint: string | number, style: any) => (props: Props) =>
    css`
      @media only screen and (min-width: ${getBreakpoint(breakpoint, props)}) {
        ${style};
      }
    `,

  upTo: (breakpoint: string | number, style: any) => (props: Props) =>
    css`
      @media only screen and (max-width: ${getBreakpoint(breakpoint, props, { isMax: true })}) {
        ${style};
      }
    `,

  bp: (breakpoint: string | number, style: any) => (props: Props) => {
    const breakpoints = sortBreakpoints(props?.theme?.breakpoints || {});

    if (!breakpoints[breakpoint]) {
      return null;
    }

    if (Object.keys(breakpoints)?.[0] === breakpoint && !!Object.keys(breakpoints)?.[1]) {
      return css`
        @media only screen and (max-width: ${getBreakpoint(Object.keys(breakpoints)?.[1], props, { isMax: true })}) {
          ${style};
        }
      `;
    }

    return css`
      @media only screen and (min-width: ${getBreakpoint(breakpoint, props)}) {
        ${style};
      }
    `;
  }
};
