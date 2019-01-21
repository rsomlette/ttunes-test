import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../Theme';

export default (ComposedComponent: any) => {
  return class WrapperComponent extends React.PureComponent {
    public state = {
      currentTheme: localStorage.getItem('@theme:current')
    };

    public switchTheme = () => {
      const currentTheme = localStorage.getItem('@theme:current');
      if (currentTheme === 'darkTheme') {
        this.setState({ currentTheme: 'lightTheme' });
        localStorage.setItem('@theme:current', 'lightTheme');
      } else {
        this.setState({ currentTheme: 'darkTheme' });
        localStorage.setItem('@theme:current', 'darkTheme');
      }
    };

    public render() {
      const theme =
        this.state.currentTheme === 'darkTheme' ? darkTheme : lightTheme;
      return (
        <ThemeProvider theme={theme}>
          <ComposedComponent
            switchTheme={this.switchTheme}
            currentTheme={this.state.currentTheme}
            {...this.props}
          />
        </ThemeProvider>
      );
    }
  };
};
