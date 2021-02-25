// helper function to
// returns css
const setCssProp = (cssProp, value, units) => `
  ${cssProp}: ${value}${typeof value === 'number' && !!units ? units : ''};
`;

export default setCssProp;
