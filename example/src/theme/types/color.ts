type RGB = `rgb(${string})`;
type RGBA = `rgba(${string})`;
type HEX = `#${string}`;
type HSL = `hsl(${string})`;
type HSLA = `hsla(${string})`;

export type Color = RGB | RGBA | HEX | HSL | HSLA;

export type Colors = Readonly<{
  [colorCode: string]: Color | Function;
}>;
