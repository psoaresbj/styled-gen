const css = (strings: TemplateStringsArray, ...args: any) => {
  // merge all of the evaluated values from the template literal
  const evaluated = strings.reduce((result: string[], string: string, index) => {
    result.push(string);

    if (args[index]) result.push(args[index]);

    return result;
  }, []);

  return evaluated;
};

export default css;
