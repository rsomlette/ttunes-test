import * as React from 'react';
import styled from 'src/lib/styled-component';
import { ThemeSwitcher } from '../theme-switcher';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
`;

interface IProps {
  currentTheme: string;
  switchTheme: any;
}

export const Header = (props: IProps) => (
  <Wrapper>
    <div>React Practice</div>
    <ThemeSwitcher {...props} />
  </Wrapper>
);
