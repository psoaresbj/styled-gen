import { css } from 'styled-components'

import defaultEaseLib from './ease'
import durations from './durations'

const defaultDuration = 500

const transition = (props, {cssProps, duration, ease}) => {
  // try to fetch durations
  // from theme
  const themeDurations = props && props.theme ? props.theme.duration || {} : {}

  // merge theme durations with
  // default durations
  const durationLib = {...durations, themeDurations}

  // try to fetch ease
  // from theme
  const themeEase = props && props.theme ? props.theme.ease || {} : {}

  // merge theme ease functions with
  // default ease functions
  const easeLib = {...defaultEaseLib, themeEase}

  // sets duration value
  const durationVal = durationLib[duration] || duration || defaultDuration

  // returns animation string
  return `${cssProps || 'all'} ${typeof durationVal === 'number' ? `${durationVal}ms` : durationVal} ${easeLib[ease] || ease}`
}

const setTransitions = (props, {cssProps, duration, ease}) =>
  Array.isArray(cssProps)
    // if cssProps is an array
    // strings, concatenate them
    ? cssProps.map(cssProp => transition(props, {cssProps: cssProp, duration, ease})).join(', ')
    // if ccsProps is not an array
    // just pass that to transition
    // as it is
    : transition(props, {cssProps, duration, ease})

const transitions = (cssProps, duration, ease) => css`
    transition: ${props => setTransitions(props, {cssProps, duration, ease})};
`

export default transitions
