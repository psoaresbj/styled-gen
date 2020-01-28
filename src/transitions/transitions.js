import { css } from 'styled-components'
import { durations } from './durations'
import { ease as eases } from './ease'
import lodash from 'lodash'

const { get } = lodash

const defaultDuration = 500

const transition = (props, {cssProps, duration, ease}) => {
  const themeDurations = get(props, 'theme.duration', {})
  const durationLib = {...durations, themeDurations}
  const themeEases = get(props, 'theme.ease', {})
  const easeLib = {...eases, themeEases}
  const durationVal = get(durationLib, duration) || duration || defaultDuration

  return `${cssProps || 'all'} ${typeof durationVal === 'number' ? `${durationVal}ms` : durationVal} ${easeLib[ease] || ease}`
}

const setTransitions = (props, {cssProps, duration, ease}) =>
  Array.isArray(cssProps)
    ? cssProps.map(cssProp => transition(props, {cssProps: cssProp, duration, ease})).join(', ')
    : transition(props, {cssProps, duration, ease})

export const transitions = (cssProps, duration, ease) => css`
    transition: ${props => setTransitions(props, {cssProps, duration, ease})};
`
