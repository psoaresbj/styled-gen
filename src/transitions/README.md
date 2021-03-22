# transitions

> Helper function to deal with the CSS `transition` property

## Related files

There are some default properties to use with this function:

- [durations](durations.js)
- [ease](ease.js)

## Usage

```jsx
import React from 'react'
import styled from 'styled-components'
import { transitions } from 'styled-gen'

// Arguments to the `transitions` function:
//   - cssProps: string or array of strings
//     with the CSS prop(s) that we want
//     to affect with transition.
//
//   - duration: string or number.
//     If the string matches any
//     of the valid `durations` keys,
//     this sets that value (in ms)
//     as the duration. If a number
//     is passed, then it sets that
//     value (in ms).
//     The durations object can be extended
//     with a `theme.durations` object
//     passed via `ThemeProvider`.
//
//   - ease function: string.
//     If the string matches any
//     of the valid `ease` keys,
//     this sets that value
//     as the ease function. If not,
//     it just returns the string as it is.
//     The `ease` object can be extended
//     with a `theme.ease` object
//     passed via `ThemeProvider`.

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
