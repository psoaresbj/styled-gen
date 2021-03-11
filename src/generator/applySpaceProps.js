import { applyVariableProp } from './applyVariableProps';
import getVariables from './getVariables';

const sidesArr = ['top', 'right', 'bottom', 'left'];

const applySpaceProp = (allProps, { prop, list, units }) => {
  const { theme, ...props } = allProps;

  if (!prop) {
    return;
  }

  const firstLetter = prop.charAt(0);
  const variables = getVariables(list, theme);

  return sidesArr.map(side => {
    const applyObj = {
      cssProp: `${prop}-${side}`,
      list: variables,
      name: `${firstLetter}${side.charAt(0)}`,
      units: units || 'rem'
    };

    return applyVariableProp({ theme, ...props }, applyObj);
  });
};

const applySpaceProps = props => {
  const spaceProps = props?.theme?.generator?.spaceProps;

  if (!spaceProps?.length) {
    return;
  }

  return spaceProps.map(config => applySpaceProp(props, config));
};

export default applySpaceProps;
