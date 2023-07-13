# styled-gen

> Set of tools for [styled-components](https://styled-components.com/)

[![NPM](https://img.shields.io/npm/v/styled-gen.svg)](https://www.npmjs.com/package/styled-gen) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

If you're migrating from v1 to v2, follow the [migration guide](https://docs.page/psoaresbj/styled-gen/migration-v2).

## What is styled-gen?

styled-gen is a collection of helper functions that simplify the integration of multiple styles as React props within your styled components. It provides shorthand properties for managing layout components without the need to style them separately.

`generateProps` usage example:

```jsx title="MyComponent.jsx"
import { generateProps } from 'styled-gen';
import styled from 'styled-components';

cons MyStyledComp = styled.div`
  // your css...

  ${generateProps};
`;

export const MyComponent = () => (
  <div>
    <MyStyledComp $tAlign={{ md: 'center', xs: 'left' }}>
      Vestibulum auctor dapibus neque.
    </MyStyledComp>
  </div>
)
```

## Documentation
Visit [https://docs.page/psoaresbj/styled-gen](https://docs.page/psoaresbj/styled-gen) to view full documentation.

## License

MIT © [psoaresbj](https://github.com/psoaresbj)
