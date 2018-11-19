import * as React from 'react';
import { Moon, Sun } from 'react-feather';
import styled from 'src/lib/styled-component';

const NavItem = styled.div`
  position: fixed;

  top: 10px;
  right: 10px;
  user-select: none;
  cursor: pointer;
  outline: 0;
  border: none;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  text-align: center;
  border-radius: 2px;
  color: ${props => props.theme.colors.text};
`;

interface IProps {
  currentTheme: string;
  switchTheme: () => void;
}

export class ThemeSwitcher extends React.PureComponent<IProps> {
  public render() {
    const { currentTheme } = this.props;
    return (
      <NavItem onClick={this.props.switchTheme}>
        {currentTheme === 'darkTheme' ? <Sun /> : <Moon />}
      </NavItem>
    );
  }
}
