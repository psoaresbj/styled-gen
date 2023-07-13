import { FontFamilies, FontTypography, FontWeights, Fonts } from '../types/fonts';

/* eslint-disable sort-keys-fix/sort-keys-fix */
const weights = {
  light: 300,
  regular: 400,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900
} as const satisfies FontWeights;
/* eslint-enable sort-keys */

const families = {
  mono: '"Red Hat Mono", monospace',
  sans: '"Figtree", sans-serif'
} as const satisfies FontFamilies;

export const typography = {
  heading: {
    h1: { md: [44, 48], xs: [30, 32] },
    h2: { md: [36, 40], xs: [26, 28] },
    h3: { md: [28, 30], xs: [22, 24] },
    h4: { md: [24, 28], xs: [20, 22] },
    h5: { md: [20, 22], xs: [18, 20] },
    h6: [18, 20]
  },

  body: {
    xl: [20, 30],
    lg: [18, 30],
    base: [16, 26],
    sm: [14, 22],
    xs: [12, 18]
  },

  label: {
    lg: [12, 12],
    base: [10, 10]
  }
} as const satisfies FontTypography;

export const fonts = {
  families,
  typography,
  weights
} as const satisfies Fonts;
