import { colors, fonts } from '../variables';
import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

const GlobalStyle: any = createGlobalStyle`
  ${styledReset}

  * {
    box-sizing: border-box;
  }

  html,
  body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: ${colors.n01};
    color: ${colors.n06};
    font-family: ${fonts.families.sans};
    font-weight: ${fonts.weights.regular};
    margin: unset;
    position: relative;

    -webkit-overflow-scrolling: touch;

    &.menu-open,
    &.modal-open {
      overflow-y: hidden;
    }
  }

  a {
    outline: 0;
    text-decoration: none;

    &:active,
    &:focus,
    &:hover {
      outline: 0;
    }

    &:not(:disabled) {
      cursor: pointer;
    }
  }

  button {
    background: none;
    border: 0;
    outline: 0;
    padding: unset;
  }
`;

export default GlobalStyle;
