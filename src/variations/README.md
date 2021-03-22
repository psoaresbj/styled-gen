# variations

> Generate variations of your styled components from objects

## Usage

First, create your variations for your styled components.
Add a default variation for when you don't pass any variation prop.

```jsx
import styled, { css } from 'styled-components'
import { variations } from 'styled-gen'

const btnSizes = {
  default: css`
    font-size: 20px;
    padding: 18px 32px;
  `,

  small: css`
    font-size: 16px;
    padding: 8px 24px;
  `,

  large: css`
    font-size: 28px;
    padding: 24px 48px;
  `
};

const btnColors = {
  alternate: css`
    background-color: ${({theme}) => theme.colors.red};
  `

  default: css`
    background-color: transparent;
  `
}

const Button = styled.button`
  box-shadow: 0;
  border: 0;
  border-radius: 3px;
  background-color: ${({theme}) => theme.colors.blue};
  color: ${({theme}) => theme.colors.white};

  ${variations(btnSizes)}
  ${variations(btnColors)}
`
```

Then you can use the variations as props:

```jsx
render() {
  return(
    {/* ... */}
    <Button small alternate>
      some text
    </Button>
    {/* ... */}
  )
}
```

## License

MIT © [psoaresbj](https://github.com/psoaresbj)
