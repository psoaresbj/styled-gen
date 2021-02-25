const getVariations = (props, variations) => {
  const variationName = Object.keys(variations).reduce(
    (results, variation) => Object.keys(props).find(prop => props[variation] && prop === variation) || results,
    []
  );

  return variations[variationName] || variations?.default || null;
};

export const variations = variations => props => `
  ${getVariations(props, variations)};
`;
