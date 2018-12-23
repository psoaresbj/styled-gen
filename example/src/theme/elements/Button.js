import styled, { css } from 'styled-components'
import { variations } from 'styled-gen'

const btnSizes = {
    small: css`
        font-size: 16px;
        padding: 8px 24px;
    `,

    default: css`
        font-size: 20px;
        padding: 18px 32px;
    `,

    large: css`
        font-size: 28px;
        padding: 24px 48px;
    `,
};

const btnColors = {
    alternate: css`
        background-color: ${({theme}) => theme.colors.red};
    `
}

const Button = styled.button`
    cursor: pointer;
    outline: 0;
    box-shadow: 0;
    border: 0;
    border-radius: 3px;
    padding: 5px 20px;
    font-size: 20;
    background-color: ${({theme}) => theme.colors.blue};
    color: ${({theme}) => theme.colors.white};

    & + & {
        margin-left: 2rem;
    }

    &:hover {
        opacity: .75;
    }

    ${variations(btnColors)};
    ${variations(btnSizes)};
`

export default Button;