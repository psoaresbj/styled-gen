const tags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'] as const;

const getTag = (props: any, { defaultTag = 'div', htmlTagsArray = tags } = {}) =>
  Object.keys(props).reduce((acc, prop) => (htmlTagsArray.find(tag => tag === prop) ? prop : acc), defaultTag);

export default getTag;
