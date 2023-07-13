import { CSSProp, ParsedProp, SpaceProp, Theme } from '../types';
import { config } from '../constants/config';
import { getList } from './getList';
import { spaceNames } from '../constants/spaceNames';

const directions = ['top', 'right', 'bottom', 'left'] as const;

export const parseSpaceProps = (theme?: Theme, props?: { [key: string]: any }): ParsedProp[] => {
  if (!theme || !props) {
    return [];
  }

  const propKeys = Object.keys(props || {});
  const transientPrefix = theme?.config?.transientPrefix || config.transientPrefix;
  const configUnits = theme?.config?.units || config.units;

  const spaceProps = spaceNames.filter(spaceName => propKeys.includes(`${transientPrefix}${spaceName}`)) || [];

  if (!spaceProps?.length) {
    return [];
  }

  return (theme?.generator?.spaceProps || []).reduce((result: ParsedProp[], spaceProp: SpaceProp) => {
    const { prop, units: spacePropUnits } = spaceProp;
    const list = getList(spaceProp?.list, theme) as { [key: string]: string | number };
    const firstChar = prop.substring(0, 1);

    const units = spacePropUnits || configUnits;

    return [
      ...result,
      ...spaceProps.reduce((entries: ParsedProp[], shorthandPropName) => {
        if (!shorthandPropName.startsWith(firstChar)) {
          return entries;
        }

        const direction = directions.find(dir => dir.startsWith(shorthandPropName.substring(1, 2)));

        const name = `${transientPrefix}${shorthandPropName}`;

        return [
          ...entries,
          {
            cssProp: `${prop}-${direction}` as CSSProp,
            list,
            propValue: props[name],
            units
          }
        ];
      }, [])
    ];
  }, []);
};
