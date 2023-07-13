import { PropList, Theme } from '../types';

export const getList = (list?: PropList, theme?: Theme | { [key: string]: any }): any => {
  try {
    if (typeof list !== 'string') {
      return list;
    }

    const keys = list.split('.');

    return keys?.length > 1 ? getList(keys.slice(1).join('.'), theme?.[keys[0]]) : theme?.[list];
  } catch (error) {
    console.log(error);

    return list;
  }
};
