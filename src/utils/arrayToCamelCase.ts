export const arrayToCamelCase = (strings: string[]) => {
  return strings.reduce(
    (result, current, index) =>
      `${result}${index ? `${current.substring(0, 1).toUpperCase()}${current.substring(1)}` : current}`,
    ''
  );
};
