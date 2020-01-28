import { css } from 'styled-components'
import { getBps } from './getBps'

const getBp = (bp, props, options) => {
  const bps = getBps(props)
  return bps[bp] !== undefined
    ? `${bps[bp] - (options && options.isMax ? 1 / 16 : 0)}em`
    : typeof bp === 'number'
      ? `${bp - (options && options.isMax ? 1 / 16 : 0)}em`
      : typeof bp === 'number'
        ? `${bp}em`
        : '100%'
}

export const mq = {
  upTo: (bp, style) => css`
    ${(props) => css`
      @media only screen and (max-width: ${getBp(bp, props, {isMax: true})}) {
        ${style};
      }
    `};
  `,

  from: (bp, style) => css`
    ${(props) => css`
      @media only screen and (min-width: ${getBp(bp, props)}) {
        ${style};
      }
    `};
  `,

  between: (bp1, bp2, style) => css`
    ${(props) => css`
      @media only screen and (min-width: ${getBp(bp1, props)}) and (max-width: ${getBp(bp2, props, {isMax: true})}) {
        ${style};
      }
    `};
  `,

  phone: (style) => css`
    ${(props) => css`
      @media only screen and (max-width: ${getBp('tablet', props, {isMax: true})}) {
        ${style};
      }
    `};
  `,

  tablet: (style) => css`
    ${(props) => css`
      @media only screen and (min-width: ${getBp('tablet', props)}) {
        ${style};
      }
    `};
  `,

  tabletLandscape: (style) => css`
    ${(props) => css`
      @media only screen and (min-width: ${getBp('tabletLandscape', props)}) {
        ${style};
      }
    `};
  `,

  tabletLandscapeMax: (style) => css`
    ${(props) => css`
      @media only screen and (max-width: ${getBp('tabletLandscape', props, {isMax: true})}) {
        ${style};
      }
    `};
  `,

  desktop: (style) => css`
    ${(props) => css`
      @media only screen and (min-width: ${getBp('desktop', props)}) {
        ${style};
      }
    `};
  `
}
