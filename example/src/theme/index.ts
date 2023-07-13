import type { Theme } from 'styled-gen';

import { breakpoints, colors, config, durations, ease, generator } from './variables';

const theme = {
  breakpoints,
  colors,
  config,
  durations,
  ease,
  generator
} satisfies Theme;

export default theme;
