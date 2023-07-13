import { Alignments, VerticalAlignments } from '../types/alignments';
import { GeneratedProps, MqBoolProps, MqProps } from '../types';
import { Theme, applyNamedProp, applyVariableProp, generateProps } from 'styled-gen';
import styled, { css } from 'styled-components';

const defaults = {
  cols: 12,
  gutter: 1.5,
  margin: 1.5,
  width: 75
};

export const Grid = styled.div<GeneratedProps>`
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ grid }: Theme) => grid?.width || defaults.width}rem;
  padding-left: ${({ grid }: Theme) => grid?.margin || defaults.margin}rem;
  padding-right: ${({ grid }: Theme) => grid?.margin || defaults.margin}rem;
  width: 100%;

  ${generateProps};
`;

const alignmentPropsMap = {
  horizontal: {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end'
  },

  vertical: {
    bottom: 'flex-end',
    middle: 'center',
    top: 'flex-start'
  }
};

type TopProps = {
  alignContent?: MqProps<Alignments>;
  reverse?: MqBoolProps;
};

const rowConfig = {
  shouldForwardProp: (prop: any) => !['alignContent', 'reverse'].includes(prop)
};

export const Row = styled.div.withConfig(rowConfig)<TopProps>`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  margin-left: ${({ grid }: Theme) => -((grid?.gutter || defaults.gutter) / 2)}rem;
  margin-right: ${({ grid }: Theme) => -((grid?.gutter || defaults.gutter) / 2)}rem;

  ${applyNamedProp(
    'reverse',
    [
      css`
        flex-direction: ${({ reverse }: any) => (reverse?.from || reverse === true ? 'row-reverse' : 'row')};
      `,
      css`
        flex-direction: ${({ reverse }: any) => (!reverse ? 'row' : 'row-reverse')};
      `
    ],
    { useTransientPrefix: false }
  )}

  ${applyVariableProp(
    'alignContent',
    (value: Alignments) => {
      const [hAlignment, vAlignment] = value.split(' ');

      const alignItems =
        alignmentPropsMap.vertical[hAlignment as keyof typeof alignmentPropsMap.vertical] ||
        alignmentPropsMap.vertical[vAlignment as keyof typeof alignmentPropsMap.vertical];
      const justifyContent = alignmentPropsMap.horizontal[hAlignment as keyof typeof alignmentPropsMap.horizontal];

      return css`
        align-items: ${alignItems};
        justify-content: ${justifyContent};
      `;
    },
    { useTransientPrefix: false }
  )}
`;

type ColProps = {
  alignSelf?: MqProps<VerticalAlignments>;
  colSize?: MqProps<number>;
  push?: MqProps<number>;
};

const colConfig = {
  shouldForwardProp: (prop: any) => !['alignSelf', 'colSize', 'push'].includes(prop)
};

export const Col = styled.div.withConfig(colConfig)<ColProps>`
  box-sizing: border-box;
  padding-left: ${({ grid }: Theme) => (grid?.gutter || defaults.gutter) / 2}rem;
  padding-right: ${({ grid }: Theme) => (grid?.gutter || defaults.gutter) / 2}rem;

  ${applyVariableProp(
    'push',
    (value: number) => css`
      margin-left: ${({ grid }: any) => (value / (grid?.cols || defaults.cols)) * 100}%;
    `,
    { useTransientPrefix: false }
  )};

  ${applyVariableProp(
    'colSize',
    (value: number) => css`
      width: ${({ grid }: any) => (value / (grid?.cols || defaults.cols)) * 100}%;
    `,
    { useTransientPrefix: false }
  )};

  ${applyVariableProp(
    'alignSelf',
    (value: VerticalAlignments) => {
      const alignSelf = alignmentPropsMap.vertical[value as keyof typeof alignmentPropsMap.vertical];

      return css`
        align-self: ${alignSelf};
      `;
    },
    { useTransientPrefix: false }
  )}
`;

Col.defaultProps = {
  colSize: 12
};
