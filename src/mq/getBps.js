import breakpoints from './breakpoints'

const getBps = props => props && props.theme && props.theme.breakpoints
  ? { ...breakpoints, ...props.theme.breakpoints }
  : breakpoints

export default getBps
