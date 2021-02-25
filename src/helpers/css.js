export const css = (strings, ...args) => {
  // merge all of the evaluated values from the template literal
  const evaluated = strings.reduce((acc, string, i) => {
    acc.push(string);

    if (args[i]) acc.push(args[i]);

    return acc;
  }, []);

  return evaluated;
};
