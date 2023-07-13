import { css } from 'styled-components';
import { durations } from '../variables/durations';
import { ease as eases } from '../variables/ease';

const defaultDuration = 500;

type Duration = keyof typeof durations;
type Ease = keyof typeof eases;

export const transitions = (cssProps: string | string[], duration: Duration | number, ease: Ease) => (props: any) => {
  const durationVal =
    props?.theme?.durations?.[duration] || durations[duration as Duration] || duration || defaultDuration;
  const transitionDuration = typeof durationVal === 'number' ? `${durationVal}ms` : durationVal;
  const transitionTimingFunction = props?.theme?.ease?.[ease] || eases[ease as Ease] || ease;
  const transitionProperty = Array.isArray(cssProps) ? cssProps.join(', ') : cssProps || 'all';

  return css`
    transition-duration: ${transitionDuration};
    transition-property: ${transitionProperty};
    transition-timing-function: ${transitionTimingFunction};
  `;
};
