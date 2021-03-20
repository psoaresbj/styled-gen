import Div from '../theme/elements/Div';
import React from 'react';

const FunctionExample = () => {
  return (
    <>
      <Div margin="2 null">This text have a margin-top and a margin-bottom of 2rem</Div>
      <Div bgBlue size={{ sm: 40, xs: 20 }} flex>
        box with 20rem up to tablet, 40rem on higher - flex function to middle
      </Div>
    </>
  );
};

export default FunctionExample;
