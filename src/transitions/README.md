# transitions

> Helper function to deal with css transition property

## Related files

There are some default properties to use with this function:

- [durations](durations.js)
- [ease](ease.js)

## Usage

```jsx
import React from 'react'
import styled from 'styled-components'
import { transitions } from 'styled-gen'

// transitions fn arguments:
//   - cssProps: string or arr of strings
//     with the css prop(s) that we want
//     affect with transition
//
//   - duration: string or number
//     if the string matches any
//     of the `durations` keys
//     sets that value (in ms)
//     as the duration. If a number
//     is passed, then sets that
//     value (in ms).
//     The durations obj can be extended
//     with theme.durations obj passed
//     via ThemeProvider
//
//   - ease function: string
//     if the string matches any
//     of the `ease` keys
//     sets that value
//     as the ease fn. If not, just
//     returns the string as it is.
//     The ease object can be extended
//     with theme.ease obj passed
//     via ThemeProvider

const Btn = styled.button`
    font-size: 20px;

    ${transitions('color', 'hover', 'inOutCubic')};

    &:hover {
        color: ${({theme}) => theme.colors.blue};
    }
`
```

## License

MIT © [psoaresbj](https://github.com/psoaresbj)