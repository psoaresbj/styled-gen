/* eslint-disable sort-keys */
import { css } from '../helpers/css';
import { getBps } from './getBps';

const getBp = (bp, props, options) => {
  const bps = getBps(props);

  if (bps[bp]) {
    return `${bps[bp] - (options && options.isMax ? 1 / 16 : 0)}em`;
  }

  if (typeof bp === 'number') {
    return `${bp - (options && options.isMax ? 1 / 16 : 0)}em`;
  }

  return bp || '100%';
};

export const mq = {
  upTo: (bp, style) => props => css`
    @media only screen and (max-width: ${getBp(bp, props, { isMax: true })}) {
      ${style};
    }
  `,

  from: (bp, style) => props => css`
    @media only screen and (min-width: ${getBp(bp, props)}) {
      ${style};
    }
  `,

  between: (bp1, bp2, style) => props => css`
    @media only screen and (min-width: ${getBp(bp1, props)}) and (max-width: ${getBp(bp2, props, { isMax: true })}) {
      ${style};
    }
  `,

  phone: style => props => css`
    @media only screen and (max-width: ${getBp('tablet', props, { isMax: true })}) {
      ${style};
    }
  `,

  tablet: style => props => css`
    @media only screen and (min-width: ${getBp('tablet', props)}) {
      ${style};
    }
  `,

  tabletLandscape: style => props => css`
    @media only screen and (min-width: ${getBp('tabletLandscape', props)}) {
      ${style};
    }
  `,

  tabletLandscapeMax: style => props => css`
    @media only screen and (max-width: ${getBp('tabletLandscape', props, { isMax: true })}) {
      ${style};
    }
  `,

  desktop: style => props => css`
    @media only screen and (min-width: ${getBp('desktop', props)}) {
      ${style};
    }
  `
};
