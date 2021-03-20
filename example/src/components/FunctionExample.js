import Div from '../theme/elements/Div';
import React from 'react';

const FunctionExample = () => {
  return (
    <>
      <Div margin="2 null">This text have a margin-top and a margin-bottom of 2rem</Div>
      <Div bgBlue size={{ sm: 500, xs: 250 }} flex>
        box with 250px up to tablet, 500px on higher - flex function to middle
      </Div>
    </>
  );
};

export default FunctionExample;
