# mq

> Media queries helpers for your styled components

## Usage

Set your app breakpoints and add it to your theme via styled-components `ThemeProvider`:

```jsx
import React from 'react'
import { ThemeProvider } from 'styled'

// `mq`'s breakpoints use `em` as units.
//
// These are `mq`'s default breakpoints:
//   xs: 0,
//   sm: 48, // 768px
//   md: 64, // 1024px
//   lg: 76, // 1216px
//
//   phone: 0,
//   tablet: 48,
//   tabletLandscape: 64,
//   desktop: 76
//
// If you decide to add yours,
// these will be extended.

// Adding / editing breakpoints
const breakpoints = { sm: 50, tv: 80 };

const theme = {
  colors: { red: '#a5000', green: '##008b00' };
  breakpoints,
}

const App = () => (
  <ThemeProvider theme={theme}>
    <div>
      {/* app content */}
    </div>
  </ThemeProvider>
)
```

Use it with your styled components:

```jsx
import React from 'react'
// Using styled components' `css`
// helper function, to make sure
// the editor that's being used
// can highlight the CSS correctly
// if any styled-components highlight
// plugin is being used.
import { css } from 'styled'
import mq from 'styled-helper-mq'

const MyStyledComponent = styled.div`
  font-size: 16px;

  ${mq.between('tablet', 'tv', css`
    font-size: 200px;
  `)}

  ${mq.desktop(css`
    font-size: 20px;
  `)}
`

const App = () => (
  <MyStyledComponent>
    this text will change on window resize XD
  </MyStyledComponent>
)
```

## Argument types and methods

Argument types:

**Arg** | **type** | **Description**
------- | -------- | ---------------
`bp` | `string` or `number` | Breakpoint: can be a string that matches any of the breakpoints, or a number that stands for a size in `em` units. If the string doesn't exist as a key in the theme breakpoints object, the breakpoint size will be `100%`;
`style` | `string` | Style should be a CSS string

List of methods that can be used with variable breakpoints:

**Method** | **Arguments** | **Description**
---------- | ------------- | ---------------
`upTo` | `bp`, `style` | This will set the `style` up to `bp`
`from` | `bp`, `style` | This will set the `style` from the `bp`
`between` | `bp`, `bp`, `style` | This will set the `style` from the first `bp` and the second `bp`

List of methods that can be used with named breakpoints:

**Method** | **Arguments** | **Description**
---------- | ------------- | ---------------
`phone` | `style` | This will set the `style` up to the `tablet` breakpoint `- 1px`
`tablet` | `style` | This will set the `style` from the `tablet` breakpoint
`tabletLandscape` | `style` | This will set the `style` from the `tabletLandscape` breakpoint
`tabletLandscapeMax` | `style` | This will set the `style` up to the `tabletLandscape` breakpoint `- 1px`
`desktop` | `style` | This will set the `style` from `desktop` breakpoint `- 1px`

## License

MIT © [psoaresbj](https://github.com/psoaresbj)
