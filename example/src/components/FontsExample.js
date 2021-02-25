import { createGlobalStyle } from 'styled-components';
import { importFonts } from 'styled-gen';
import React from 'react';

const Global = createGlobalStyle`
    ${importFonts};

    body {
      font-family: ${({ theme }) => theme.fonts.families.sans};
    }
`;

const FontsExample = () => <Global />;

export default FontsExample;
