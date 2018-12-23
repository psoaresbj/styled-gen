import React from 'react'

import Div from '../theme/elements/Div'
import Button from '../theme/elements/Button'

const VariantsExample = () => (
    <React.Fragment>
        <Div as="h1">Variants</Div>
        <Div padding={50}>
            <Button>
                Default Button
            </Button>
            <Button small alternate>
                Small alternate button
            </Button>
            <Button large>
                Large Button
            </Button>
        </Div>
    </React.Fragment>
)

export default VariantsExample
