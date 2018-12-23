import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components';

import NamedPropsExample from './components/NamedPropsExample'
import SpacePropsExample from './components/SpacePropsExample';
import VariablePropsExample from './components/VariablePropsExample';
import MqExample from './components/MqExample';
import VariantsExample from './components/VariantsExample';

import theme from './theme'
export default class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <div>
            <VariantsExample />
            <NamedPropsExample />
            <SpacePropsExample />
            <VariablePropsExample />
            <MqExample />
        </div>
      </ThemeProvider>
    )
  }
}
