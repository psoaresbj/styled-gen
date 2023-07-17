import { ParsedProp, Theme, VariableProp } from '../types';
import { config } from '../constants/config';
import { getList } from './getList';

export const parseVariableProps = (theme?: Theme, props?: { [key: string]: any }): ParsedProp[] => {
  if (!theme || !props) {
    return [];
  }

  const propKeys = Object.keys(props || {});
  const transientPrefix = theme?.config?.transientPrefix || config.transientPrefix;
  const configUnits = theme?.config?.units || config.units;

  return (theme?.generator?.variableProps || []).reduce((result: ParsedProp[], variableProp: VariableProp) => {
    const list = getList(variableProp?.list, theme) as { [key: string]: string | number };
    const { cssProp, helperFn, name: nameWithoutTransient, units: variablePropUnits } = variableProp;

    const units =
      typeof variablePropUnits !== 'string' && variablePropUnits !== false ? configUnits : variablePropUnits;

    const name = `${transientPrefix}${nameWithoutTransient}`;

    if (!propKeys.includes(name)) {
      return result;
    }

    if (!!helperFn) {
      return [
        ...result,
        {
          helperFn,
          list,
          propValue: props[name],
          units
        }
      ];
    }

    return [
      ...result,
      {
        cssProp,
        list,
        propValue: props[name],
        units
      }
    ];
  }, []);
};
