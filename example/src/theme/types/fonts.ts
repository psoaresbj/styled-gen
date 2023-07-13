import type { MqProp } from 'styled-gen';

export type FontFamilies = Readonly<{ [type: string]: string }>;

export type FontTypography = Readonly<{
  [type: string]: {
    [size: string]: MqProp<string, Readonly<number | number[]>>;
  };
}>;

export type FontWeights = Readonly<{ [weight: string]: number }>;

export type Fonts = Readonly<{
  families?: FontFamilies;
  typography?: FontTypography;
  weights?: FontWeights;
}>;
