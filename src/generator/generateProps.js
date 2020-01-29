import { css } from 'styled-components'

import applyNamedProps from './applyNamedProps'
import applyVariableProps from './applyVariableProps'
import applySpaceProps from './applySpaceProps'

export const generateProps = css`
  ${applyNamedProps};
  ${applyVariableProps};
  ${applySpaceProps};
`
