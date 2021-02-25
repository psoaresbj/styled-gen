import { css } from '../helpers/css';

import applyNamedProps from './applyNamedProps';
import applySpaceProps from './applySpaceProps';
import applyVariableProps from './applyVariableProps';

export const generateProps = props => css`
  ${applyNamedProps};
  ${applyVariableProps};
  ${applySpaceProps};
`;
