# variations

> Generate variations of your styled components from objects

## Usage

1. create your variations for your styled components

```jsx
import styled, { css } from 'styled-components'
import { variations } from 'styled-gen'

const btnSizes = {
    // set any name and css you
    // want to apply as variation
    // but be !careful! and try to
    // not clash with generator
    // named and varible props
    // ex: a common variation may
    // be `sm`. this is usually
    // used as a named prop for text too!
    small: css`
        font-size: 16px;
        padding: 8px 24px;
    `,

    // if you pass a default
    // variation, this will be
    // used as main and you will
    // not need to add it to your
    // component
    // It's strongly advised to
    // use default variations and
    // to avoid to add those same
    // props to the main style,
    // that way, props will not be
    // overwritten
    default: css`
        font-size: 20px;
        padding: 18px 32px;
    `,

    large: css`
        font-size: 28px;
        padding: 24px 48px;
    `
};

const btnColors = {
    // as mentioned above,
    // is not required to add
    // a default variation,
    // but it's strongly
    // advised to!
    alternate: css`
        background-color: ${({theme}) => theme.colors.red};
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

1. Use them as props

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