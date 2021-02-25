import Button from '../theme/elements/Button';
import Div from '../theme/elements/Div';
import React from 'react';

const VariantsExample = () => (
  <>
    <Div as="h1">Variants</Div>
    <Div padding={50}>
      <Button>Default Button</Button>
      <Button small alternate>
        Small alternate button
      </Button>
      <Button large>Large Button</Button>
    </Div>
  </>
);

export default VariantsExample;
