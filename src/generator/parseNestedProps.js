import { camelcase } from '../helpers/camelcase'

const flatten = (objectOrArray, prefix = '') => {
  const nestElement = (prev, value, key) => (value && typeof value === 'object'
    ? { ...prev, ...flatten(value, `${prefix}${key}.`) }
    : { ...prev, ...{ [`${prefix}${key}`]: value } })

  return Array.isArray(objectOrArray)
    ? objectOrArray.reduce(nestElement, {})
    : Object.keys(objectOrArray).reduce(
      (prev, element) => nestElement(prev, objectOrArray[element], element),
      {}
    )
}

const parseNestedProps = props => {
  const flattenObj = flatten(props, '-')
  const camelCased = camelcase(flattenObj)
  return camelCased
}

export default parseNestedProps
