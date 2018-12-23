import React from 'react'

import Div from '../theme/elements/Div'

const NamedPropsExample = () => (
    <React.Fragment>
        <Div as="h1">Named props</Div>
        <Div red>
            This text is red
        </Div>
        <Div blue="tablet">
            This text is default in mobile but turns blue if tablet or something bigger :p
        </Div>
        <Div bgGreyLight>
            This text is Grey Light (greyLight) background
        </Div>
        <Div greyBase>
            This text is Grey base (greyBase)
        </Div>
        <Div bold>
            This text is bold
        </Div>
    </React.Fragment>
)

export default NamedPropsExample
