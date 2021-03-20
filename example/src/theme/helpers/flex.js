import { css } from 'styled-components';

export const flex = (inline, direction) => css`
  align-items: center;
  display: ${inline === 'inline' ? 'inline-flex' : 'flex'};
  justify-content: center;
  flex-direction: ${direction || 'row'};
`;
