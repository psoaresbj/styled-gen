import Div from '../theme/elements/Div';
import React from 'react';

const NamedPropsExample = () => (
  <>
    <Div as="h1">Named props</Div>
    <Div red>This text is red</Div>
    <Div blue="tablet">This text is default in mobile but turns blue if tablet or something bigger :p</Div>
    <Div bgGreyLight>This text is Grey Light (greyLight) background - nested props</Div>
    <Div greyBase>This text is Grey base (greyBase) - nested props</Div>
    <Div bold>This text is bold</Div>
  </>
);

export default NamedPropsExample;
