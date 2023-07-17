import { NamedProp, ParsedProp, Theme } from '../types';
import { arrayToCamelCase } from './arrayToCamelCase';
import { config } from '../constants/config';
import { getList } from './getList';

export const parseNamedProps = (theme?: Theme, props?: { [key: string]: any }): ParsedProp[] => {
  if (!theme || !props) {
    return [];
  }

  const propKeys = Object.keys(props || {});
  const transientPrefix = theme?.config?.transientPrefix || config.transientPrefix;
  const configUnits = theme?.config?.units || config.units;

  return (theme?.generator?.namedProps || []).reduce((result: ParsedProp[], namedProp: NamedProp) => {
    const list = getList(namedProp?.list, theme);
    const { cssProp, helperFn, units: namedPropUnits } = namedProp;

    const units = typeof namedPropUnits !== 'string' && namedPropUnits !== false ? configUnits : namedPropUnits;

    return [
      ...result,

      ...Object.entries(list).reduce((entries: ParsedProp[], [key, value]) => {
        const nameWithoutTransient = namedProp.prefix ? arrayToCamelCase([namedProp.prefix, key]) : key;

        const name = `${transientPrefix}${nameWithoutTransient}`;

        if (!propKeys.includes(name)) {
          return entries;
        }

        if (!!helperFn) {
          return [
            ...entries,
            {
              helperFn,
              helperFnArgStr: list?.[key],
              list,
              propValue: props[name],
              units
            }
          ];
        }

        return [
          ...entries,
          {
            cssProp,
            cssValue: value as string | number | undefined,
            propValue: props[name],
            units
          }
        ];
      }, [])
    ];
  }, []);
};
