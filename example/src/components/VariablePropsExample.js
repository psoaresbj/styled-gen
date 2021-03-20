import Div from '../theme/elements/Div';
import React from 'react';

const VariablePropsExample = () => (
  <>
    <Div as="h1">Variable props</Div>
    <Div display={{ md: 'block', xs: 'none' }}>this text is only visible if tablet landscape or higher</Div>
  </>
);

export default VariablePropsExample;
