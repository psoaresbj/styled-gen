import { mq } from 'styled-gen';
import styled, { css } from 'styled-components';

const Hidden = styled.div`
  display: none;

  ${mq.tabletLandscape(
    css`
      display: block;
    `
  )};
`;

export default Hidden;
