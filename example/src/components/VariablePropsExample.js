import React from 'react'

import Div from '../theme/elements/Div'

const VariablePropsExample = () => (
    <React.Fragment>
        <Div as="h1">Variable props</Div>
        <Div display={{xs: 'none', md: 'block'}}>
            this text is only visible if tablet landscape or higher
        </Div>
        <Div
            margin="2 null"
        >
            This text have a margin-top and a margin-bottom of 2rem
        </Div>
        <Div
            bgBlue
            white
            size={{xs: 200, sm: 400}}
        >
            Squared box with 200px up to tablet then, 400px after that
        </Div>
    </React.Fragment>
)

export default VariablePropsExample
