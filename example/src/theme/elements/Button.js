import { variations } from 'styled-gen';
import styled, { css } from 'styled-components';

const btnSizes = {
  default: css`
    font-size: 20px;
    padding: 18px 32px;
  `,

  large: css`
    font-size: 28px;
    padding: 24px 48px;
  `,

  small: css`
    font-size: 16px;
    padding: 8px 24px;
  `
};

const btnColors = {
  alternate: css`
    background-color: ${({ theme }) => theme.colors.red};
  `,

  default: css`
    background-color: ${({ theme }) => theme.colors.blue};
  `,

  withFn: css`
    ${({ isRed }) =>
      isRed &&
      css`
        background-color: red;
        color: blue;
      `}
  `
};

const Button = styled.button`
  border-radius: 3px;
  border: 0;
  box-shadow: 0;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 20;
  outline: 0;
  padding: 5px 20px;

  & + & {
    margin-left: 2rem;
  }

  &:hover {
    opacity: 0.75;
  }

  ${variations(btnColors)};
  ${variations(btnSizes)};
`;

export default Button;
