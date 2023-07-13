import { Heading } from './theme/components/Typography';
import { ThemeProvider } from 'styled-components';
import Div from './theme/components/Div';
import GlobalStyle from './theme/components/GlobalStyle';
import GridExample from './components/GridExample';
import Variations from './components/Variations';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />

    <Div $pl={2} $pt={2} as="main">
      <Heading>styled-gen example</Heading>

      <Variations />
    </Div>

    <GridExample />
  </ThemeProvider>
);

export default App;
