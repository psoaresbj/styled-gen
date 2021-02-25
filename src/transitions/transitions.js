import { durations } from './durations';
import { ease as eases } from './ease';

const defaultDuration = 500;

const transition = (props, { cssProps, duration, ease }) => {
  const themeDurations = props?.theme?.duration || {};
  const durationLib = { ...durations, themeDurations };
  const themeEases = props?.theme?.ease || {};
  const easeLib = { ...eases, themeEases };
  const durationVal = durationLib[duration] || duration || defaultDuration;

  return `${cssProps || 'all'} ${typeof durationVal === 'number' ? `${durationVal}ms` : durationVal} ${
    easeLib[ease] || ease
  }`;
};

const setTransitions = (props, { cssProps, duration, ease }) =>
  Array.isArray(cssProps)
    ? cssProps.map(cssProp => transition(props, { cssProps: cssProp, duration, ease })).join(', ')
    : transition(props, { cssProps, duration, ease });

export const transitions = (cssProps, duration, ease) => props => `
  transition: ${setTransitions(props, { cssProps, duration, ease })};
`;
