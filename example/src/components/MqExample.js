import { mq } from 'styled-gen';
import Hidden from '../theme/elements/Hidden';
import React from 'react';
import styled, { css } from 'styled-components';

const MyStyledComponent = styled.div`
  background-color: #f4f4f4;
  padding: 20px;
  font-size: 16px;

  ${mq.between(
    'tablet',
    'tabletLandscape',
    css`
      font-size: 36px;
    `
  )}

  ${mq.desktop(css`
    font-size: 24px;
  `)}
`;

const VariablePropsExample = () => (
  <>
    <h1>mq example</h1>
    <MyStyledComponent>
      The font size in this block will be:
      <ul>
        <li>up to tablet: 16px;</li>
        <li>between tablet and tablet landscape: 36px;</li>
        <li>between tablet landscape and desktop: 16px again;</li>
        <li>from desktop will be 24px;</li>
      </ul>
      <Hidden>
        <p>This content will be hidden in tablet portrait bp</p>
      </Hidden>
    </MyStyledComponent>
  </>
);

export default VariablePropsExample;
