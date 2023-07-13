import { Theme } from '../types';
import { applyParsedProps } from '../utils/applyParsedProps';
import { parseNamedProps } from '../utils/parseNamedProps';
import { parseSpaceProps } from '../utils/parseSpaceProps';
import { parseVariableProps } from '../utils/parseVariableProps';

type Args = {
  [key: string]: any;
  theme?: Theme;
};

export const generateProps = (args: Args) => {
  try {
    delete args.children;
    const { theme, ...props } = args;
    const generator = args?.theme?.generator;

    if (!Object.keys(props).length || typeof props !== 'object' || !generator) {
      return;
    }

    const parsedProps = [
      ...parseNamedProps(theme, props),
      ...parseSpaceProps(theme, props),
      ...parseVariableProps(theme, props)
    ];

    return applyParsedProps(parsedProps, theme);
  } catch (error) {
    console.log(error);

    return '';
  }
};
