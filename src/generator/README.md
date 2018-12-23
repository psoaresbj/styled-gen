# generator

## Usage

1. Create your `generator` variables

```javascript
// generator.js

/*
  importing polished functions
  to use them as helperFns
  any function that returns
  a css string can be used
*/
import { margin } from 'polished'

const generator = {

  /*
    Set the named props to use
    any prop can be used with
    `mq` passed named breakpoints
    (check `mq` docs to know how to
    set your own breakpoints)

    object properties:
      - suffix: string
        A string to be added before
        a named prop

      - list: string || Arr (isRequired)
        An array with objects or
        a string to match a theme key
        dot notation can be used to target
        the theme deeply

      - cssProp: string (isRequired)
        A css property string

      - units: string
        A units string
  */
  namedProps: [
    // usecase:
    // <MyComp primary />
    // or
    // <MyComp primary="md />
    { list: 'colors', cssProp: 'color' },

    // usecase:
    // <MyComp bgPrimary />
    { suffix: 'bg', list: 'colors', cssProp: 'background-color' },

    // usecase:
    // <MyComp bold />
    { list: [{this: 100, bold: 700}], cssProp: 'font-weight' },

    // usecase:
    // <MyComp sm />
    { list: 'fonts.sizes', cssProp: 'font-size', units: 'px' }
  ],

  /*
    Set the space props to use
    any prop can be used with
    `mq` passed named breakpoints
    (check `mq` docs to know how to
    set your own breakpoints)

    object properties:
      - prop: oneOf [`padding`, `margin`]
        A string that matches a css
        space property

      - list: string || Arr
        An array with objects or
        a string to match a theme key
        dot notation can be used to target
        the theme deeply

      - units: string
        A units string
  */
  spaceProps: [
    // usecase
    // <MyComp pt={50} />
    { prop: 'padding', units: 'px' },

    // usecase
    // <MyComp ml="sm" />
    // or
    // <MyComp mr={2}" />
    // or
    // <MyComp mb={{xs: 1, md: 'lg'}} />
    { prop: 'margin', list: 'spaces', units: 'rem' },
  ],

  /*
    Set the variable props to use
    any prop can be used with
    `mq` passed named breakpoints
    (check `mq` docs to know how to
    set your own breakpoints)

    object properties:
      - name: string
        Prop name to use

      - list: string || Arr
        An array with objects or
        a string to match a theme key
        dot notation can be used to target
        the theme deeply

      - cssProp: string (isRequired if no helperFn)
        A css property string

      - helperFn: function (isRequired if no cssProp)
        A function that returns one
        css string

      - units: string
        A units string
  */
  variableProps: [
    // usecase:
    // <MyComp color="primary" />
    // or
    // <MyComp color={{xs: 'primary', lg: 'greys.light'}}
    { name: 'color', list: 'colors', cssProp: 'color' },

    // usecase:
    // <MyComp display="flex" />
    // or
    // <MyComp display={{xs: 'none', lg: 'block'}}
    { name: 'display', cssProp: 'display' },

    // usecase:
    // <MyComp margin="1 null 1 2" />
    // or
    // <MyComp margin={{xs: '1 null', md: '2 null'}} />
    { name: 'margin', helperFn: margin, units: 'rem' },
  ]
}

export default generator
```

1. Add your `generator` via styled-components `ThemeProvider`.

```jsx
import generator from './generator.js'

const theme = {
    colors: { primary: '#50A2E2', greys: { light: '#f4f4f4' }},
    spaces: { sm: 1, lg: 4 },
    fonts: { sizes: { sm: 14, lg: 24 }},

    generator,
}

const App = () => (
    <ThemeProvider theme={theme}>
        <div>
            {/* app content */}
        </div>
    </ThemeProvider>
)
```

1. Use it in your styled components

```jsx
import React from 'react'
import styled from 'styled-components'
import { generateProps } from 'styled-set'

/*
  regular css prop: value;
  can be added before or after
  the generator.
  If added before, any passed
  prop in the component will
  have higher importance,
  If added after, the props
  passed in the component will
  have lower importance
*/
const Div = styled.div`
  ${generateProps};
`

const MyComp = () => (
  <Div
    margin={{xs: '1 null', md: '2 null'}}
    primary
    pl={100}
  >
    <p>
      based on the example generator, the content will have:
    </p>
    <ul>
      <li>
        Top and bottom margin of 1rem in mobile and 2rem in tablet landscape or higher.
      </li>
      <li>
        Color primary
      </li>
      <li>
        Padding left of 100px
      </li>
    </ul>
  </Div>
)
```

## License

MIT © [psoaresbj](https://github.com/psoaresbj)