/* eslint-disable no-nested-ternary */
import { MqProps } from '../../types';
import { applyVariableProp } from 'styled-gen';
import { css } from 'styled-components';

type SizeVariation = MqProps<Readonly<number | number[]>>;

type SizeVariations = { [size: string]: SizeVariation };

const applySingularSize = (size: number | number[]) => css`
  font-size: ${(typeof size === 'number' ? size : size[0]) / 16}rem;
  letter-spacing: ${typeof size === 'number'
    ? undefined
    : size[2] !== undefined
    ? `${(size[2] * 100) / 16}rem`
    : undefined};
  line-height: ${typeof size === 'number' ? undefined : size[1] !== undefined ? `${size[1] / 16}rem` : undefined};
`;

const applySizes = (key: string, sizes: SizeVariation) =>
  typeof sizes === 'number' || Array.isArray(sizes)
    ? applySingularSize(sizes)
    : applyVariableProp(sizes as any, applySingularSize, { useTransientPrefix: false });

export const getTypographySizeVariations = (
  sizeVariations: SizeVariations,
  defaults: string[] = ['base', 'h1', 'd1']
) =>
  Object.keys(sizeVariations).reduce(
    (result, key) => ({
      ...result,
      [defaults.includes(key) ? 'default' : key]: css`
        ${applySizes(key, sizeVariations[key])}
      `
    }),
    {}
  );
