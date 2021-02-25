import { breakpoints } from './breakpoints';

export const getBps = props => ({ ...breakpoints, ...(props?.theme?.breakpoints || {}) });
