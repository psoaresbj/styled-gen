import React from 'react'
import styled from 'styled-components'
import { transitions } from 'styled-gen'

const TransitionText = styled.p`
    font-size: 20px;
    margin-bottom: 3rem;

    ${({duration, ease}) => transitions('color', duration || 'hover', ease || 'inOutCubic')};

    &:hover {
        color: ${({theme}) => theme.colors.blue};
    }
`

const TransitionsExample = () => (
    <React.Fragment>
        <TransitionText duration="hover">
            This is a text with an `hover` duration transition of 250ms and with the `easeInOutCubic` ease fn
        </TransitionText>
        <TransitionText duration="animation" ease="inOutBack">
            This is a text with an `animation` duration transition of 500ms and with the `easeInOutBack` ease fn
        </TransitionText>
        <TransitionText duration={2000}>
            This is a text with an `long` duration transition of 2000ms and with the `easeInSine` ease fn
        </TransitionText>
    </React.Fragment>
)

export default TransitionsExample