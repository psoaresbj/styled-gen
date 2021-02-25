import Div from '../theme/elements/Div';
import React from 'react';

const SpacePropsExample = () => (
  <>
    <Div as="h1">Space props</Div>
    <Div pl={50}>This div has padding-left of 50px</Div>
    <Div mt={{ phone: 2, tablet: 5 }}>This div has margin-top of 2rem in mobile and 5rem in tablet or higher</Div>
  </>
);

export default SpacePropsExample;
