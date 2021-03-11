import { css } from '../helpers/css';

import applyNamedProps from './applyNamedProps';
import applySpaceProps from './applySpaceProps';
import applyVariableProps from './applyVariableProps';

export const generateProps = args => {
  delete args.children;
  const { theme, ...props } = args;

  if (!Object.keys(props).length || typeof props !== 'object') {
    return;
  }

  const namedProps = Object.keys(props).reduce(
    (acc, prop) =>
      typeof props[prop] === 'boolean' || typeof props[prop] === 'undefined' ? { ...acc, [prop]: props[prop] } : acc,
    {}
  );

  const isNamedPropsEmpty = !Object.keys(namedProps).length;

  const valueProps = Object.keys(props).reduce(
    (acc, prop) =>
      typeof props[prop] === 'object' ||
      typeof props[prop] === 'string' ||
      typeof props[prop] === 'number' ||
      Array.isArray(props[prop])
        ? { ...acc, [prop]: props[prop] }
        : acc,
    {}
  );

  const isValuePropsEmpty = !Object.keys(valueProps).length;

  if (isValuePropsEmpty && isNamedPropsEmpty) {
    return;
  }

  return css`
    ${!isNamedPropsEmpty ? applyNamedProps({ theme, ...namedProps }) : ''};
    ${!isValuePropsEmpty ? applyVariableProps({ theme, ...valueProps }) : ''};
    ${!isValuePropsEmpty ? applySpaceProps({ theme, ...valueProps }) : ''};
  `;
};
