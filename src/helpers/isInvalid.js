import { nulify } from './nulify';

export const isInvalid = val => val === undefined || val === null || val === false || nulify(val) === null;
