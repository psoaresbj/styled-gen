/* eslint-disable no-nested-ternary */
import { GeneratedProps, VariationProps } from '../../types';
import { Variations, generateProps, variations } from 'styled-gen';
import { fonts, typography } from '../../variables/fonts';
import { getTypographySizeVariations } from './getTypographySizeVariations';
import getTag from '../../utils/getTag';
import styled, { css } from 'styled-components';

const miscVariations = {
  ellipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `
};

type TypographyType<T extends Variations> = GeneratedProps &
  VariationProps<typeof miscVariations, false> &
  VariationProps<T, false>;

const [headingSizeVariations, bodySizeVariations, labelSizeVariations] = Object.entries(typography).map(([, sizes]) =>
  getTypographySizeVariations(sizes)
);

const setAttrs = (defaultTag: string) => (props: any) => ({
  as: props?.as || getTag(props, { defaultTag })
});

const config = (sizeVariations: any, defaultTag?: string) => ({
  shouldForwardProp: (prop: any) => prop !== defaultTag && !Object.keys(sizeVariations).includes(prop)
});

export const Heading = styled.h1.withConfig(config(headingSizeVariations, 'h1')).attrs(setAttrs('h1'))<
  TypographyType<typeof typography.heading>
>`
  font-weight: ${fonts.weights.black};
  text-transform: uppercase;

  ${variations([headingSizeVariations, miscVariations], false)};
  ${generateProps};
`;

export const Text = styled.div.withConfig(config(bodySizeVariations)).attrs(setAttrs('div'))<
  TypographyType<typeof typography.body>
>`
  ${variations([bodySizeVariations, miscVariations], false)};
  ${generateProps};
`;

export const Label = styled.div.withConfig(config(labelSizeVariations)).attrs(setAttrs('span'))<
  TypographyType<typeof typography.label>
>`
  display: inline-block;
  font-weight: ${fonts.weights.black};
  letter-spacing: 0.1em;
  text-transform: uppercase;

  ${variations([labelSizeVariations, miscVariations], false)};
  ${generateProps};
`;
