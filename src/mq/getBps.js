import { breakpoints } from './breakpoints'
import lodash from 'lodash'

const { get } = lodash

export const getBps = props => ({...breakpoints, ...get(props, 'theme.breakpoints', {})})
