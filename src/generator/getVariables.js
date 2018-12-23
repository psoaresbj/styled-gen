const getVariables = (list, theme) => {
  const keys = typeof list === 'string' && list.split('.')
  const shouldIterate = keys && keys.length > 1

  return !!keys && theme
    ? shouldIterate
      ? getVariables(keys.slice(1).join('.'), theme[keys[0]])
      : theme[list]
    : list
}

export default getVariables
