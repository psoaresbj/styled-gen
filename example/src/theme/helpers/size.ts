import { css } from 'styled-components';

export const size = (h: any, w: any) => css`
  height: ${h};
  width: ${w || h};
`;
