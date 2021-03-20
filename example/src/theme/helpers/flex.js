import { css } from 'styled-components';

export const flex = (direction, inline) => css`
  align-items: center;
  display: ${inline === 'inline' ? 'inline-flex' : 'flex'};
  justify-content: center;
  flex-direction: ${direction};
`;
