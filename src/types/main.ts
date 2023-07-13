import { CSSProp, PropList, Units, XOR } from './helpers';

// main types

export type NamedProp = Readonly<
  XOR<
    {
      cssProp: CSSProp;
      list: PropList;
      prefix?: string;
      units?: Units;
    },
    {
      helperFn: Function;
      list: PropList;
      prefix?: string;
      units?: Units;
    }
  >
>;

export type SpaceProp = Readonly<{
  prop: 'margin' | 'padding';
  list?: PropList;
  units?: Units;
}>;

export type VariableProp = Readonly<
  XOR<
    {
      cssProp: CSSProp;
      list?: PropList;
      name: string;
      units?: Units;
    },
    {
      name: string;
      helperFn: Function;
      list?: PropList;
      units?: Units;
    }
  >
>;

export type ParsedProp = Readonly<
  XOR<
    {
      cssProp: CSSProp;
      cssValue?: string | number;
      list?: { [key: string]: string | number };
      propValue: any;
      units?: Units;
    },
    {
      helperFn: Function;
      helperFnArgStr?: string;
      list?: { [key: string]: string | number };
      propValue: any;
      units?: Units;
    }
  >
>;

export type Generator = Readonly<{
  namedProps: ReadonlyArray<NamedProp>;
  spaceProps: ReadonlyArray<SpaceProp>;
  variableProps: ReadonlyArray<VariableProp>;
}>;

export type Breakpoints = Readonly<{
  [breakpoint: string]: number;
}>;

export type Config = Readonly<{
  transientPrefix?: string;
  units?: Units;
}>;

export type Theme = Readonly<{
  breakpoints?: Breakpoints;
  config?: Config;
  generator?: Generator;

  [otherOptions: string]: any;
}>;

export type Variations = Readonly<{
  [variation: string]: any;
}>;
