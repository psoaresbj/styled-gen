const getVariables = (list, theme) => {
  const keys = typeof list === 'string' && list.split('.');
  const shouldIterate = keys && keys.length > 1;

  if (!!keys && theme) {
    return shouldIterate ? getVariables(keys.slice(1).join('.'), theme[keys[0]]) : theme[list];
  }

  return list;
};

export default getVariables;
