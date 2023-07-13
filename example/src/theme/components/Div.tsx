import { GeneratedProps } from '../types';
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

const Div = styled.div<GeneratedProps>`
  ${generateProps}
`;

export default Div;
