import { css } from 'styled-components'
import lodash from 'lodash'

const { get } = lodash

const getVariations = (props, variations) => {
  const variationName = Object.keys(variations)
    .reduce((results, variation) => Object.keys(props)
      .find(prop => props[variation] && prop === variation) || results, [])

  return get(variations, variationName) || get(variations, 'default', null)
}

export const variations = variations => css`
  ${props => getVariations(props, variations)};
`
