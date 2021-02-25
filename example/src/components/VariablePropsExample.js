import Div from '../theme/elements/Div';
import React from 'react';

const VariablePropsExample = () => (
  <>
    <Div as="h1">Variable props</Div>
    <Div display={{ md: 'block', xs: 'none' }}>this text is only visible if tablet landscape or higher</Div>
    <Div margin="2 null">This text have a margin-top and a margin-bottom of 2rem</Div>
    <Div bgBlue white size={{ sm: 400, xs: 200 }}>
      Squared box with 200px up to tablet then, 400px after that
    </Div>
  </>
);

export default VariablePropsExample;
