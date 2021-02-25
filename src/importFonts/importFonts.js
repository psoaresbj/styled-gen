import { cap } from '../helpers/cap';
import { css } from '../helpers/css';

// helper fn that returs
// a css font-face string
const fontFace = ({ family, weight, style, src }) => css`
  @font-face {
    font-family: ${family};
    font-weight: ${weight};
    font-style: ${style};
    src: ${src};
  }
`;

// default font formats
const defaultFormats = ['woff', 'woff2'];

const importFont = (font, fontFormats) => {
  const { family, path, prefix, weights, localLoading } = font;

  // if fontFormats is undefined
  // uses defaultFormats
  const formats = fontFormats || defaultFormats;

  // iterates over weights array
  // and return fontFace fn
  // parsing and joining all
  // the formats in src
  return Object.keys(weights).map(weight =>
    fontFace({
      family,
      src: formats
        .reduce(
          (acc, format) => [
            ...acc,
            `${
              localLoading ? `local("${family} ${cap(weight)}"), local("${prefix}${weight}"), ` : ' '
            }url("${path}/${prefix}${weight}.${format}") format("${format}")`
          ],
          []
        )
        .join(',\n'),
      style: 'normal',
      weight: weights[weight]
    })
  );
};

// iterares over the theme fonts config
// property and returns importFont
export const importFonts = props =>
  props &&
  props.theme &&
  props.theme.fonts &&
  props.theme.fonts.config &&
  props.theme.fonts.config.length &&
  props.theme.fonts.config.map(font => importFont(font, props.theme.fonts.formats));
