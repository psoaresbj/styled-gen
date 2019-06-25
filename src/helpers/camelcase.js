const toCamelCase = str => !str
  ? ''
  : String(str)
    .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
    .replace(/[^A-Za-z0-9]+/g, '$')
    .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '$' + b)
    .toLowerCase()
    .replace(/(\$)(\w)/g, (m, a, b) => b.toUpperCase())

export const camelcase = obj => !obj
  ? null
  : Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    [toCamelCase(key)]: obj.key
  }), {})
