import { mq as baseMq } from 'styled-gen';
import { breakpoints } from '../variables';

export const mq = Object.keys(breakpoints).reduce(
  (result, bp) => ({ ...result, [bp]: (style: any) => baseMq.bp(bp, style) }),
  {}
) as { [bp in keyof typeof breakpoints]: Function };
