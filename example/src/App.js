import { ThemeProvider } from 'styled-components';
import FontsExample from './components/FontsExample';
import MqExample from './components/MqExample';
import NamedPropsExample from './components/NamedPropsExample';
import React, { Component } from 'react';
import SpacePropsExample from './components/SpacePropsExample';
import TransitionsExample from './components/TransitionsExample';
import VariablePropsExample from './components/VariablePropsExample';
import VariantsExample from './components/VariantsExample';

import theme from './theme';
export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <FontsExample />
          <TransitionsExample />
          <VariantsExample />
          <NamedPropsExample />
          <SpacePropsExample />
          <VariablePropsExample />
          <MqExample />
        </div>
      </ThemeProvider>
    );
  }
}
