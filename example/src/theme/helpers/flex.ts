import { css } from 'styled-components';

const alignMap = {
  around: 'space-around',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start'
} as any;

/* eslint-disable no-nested-ternary */
export const flex = (vAlign = 'start', hAlign = 'start', direction = 'row', inline = false) => css`
  align-items: ${direction === 'row' || direction === 'row-reverse' ? alignMap[vAlign] : alignMap[hAlign]};
  display: ${inline ? 'inline-flex' : 'flex'};
  flex-direction: ${direction};
  justify-content: ${direction === 'row' || direction === 'row-reverse' ? alignMap[vAlign] : alignMap[hAlign]};
`;

export const flexList = {
  center: 'center center',
  centerAround: 'center around',
  centerLeft: 'center start',
  centerRight: 'center end'
};
