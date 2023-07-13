import { Generator } from 'styled-gen';
import { colors } from './colors';
import { flex, flexList, size } from '../helpers';
import { fonts } from './fonts';

export const generator = {
  namedProps: [
    { cssProp: 'background-color', list: colors, prefix: 'bg' },
    { cssProp: 'font-weight', list: fonts.weights },
    { cssProp: 'color', list: colors },
    { cssProp: 'text-align', list: { center: 'center', left: 'left', right: 'right' } }
  ],

  spaceProps: [
    { prop: 'padding', units: 'rem' },
    { prop: 'margin', units: 'rem' }
  ],

  variableProps: [
    { cssProp: 'display', list: { hidden: 'none', visible: 'flex' }, name: 'show' },
    { helperFn: flex, list: flexList, name: 'flex' },
    { helperFn: size, name: 'sz', units: 'rem' }
  ]
} as const satisfies Generator;
