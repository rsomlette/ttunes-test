import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'src/lib/styled-component';
import { Paths } from '../../routes';
import { ThemeSwitcher } from '../theme-switcher';

const Wrapper = styled.header`
  display: flex;

  align-items: center;
  font-weight: 300;
  font-size: 20px;

  /* padding-left: 16px; */
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 45px;

  a {
    margin: 0 16px;

    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.colors.textHover};
    }
  }

  border: 1px solid ${({ theme }) => theme.colors.border};
`;

interface IProps {
  currentTheme: string;
  switchTheme: any;
}

export const Header = (props: IProps) => (
  <Wrapper>
    <Link to={Paths.home}>Spotify Artist Search</Link>
    {/* <Link to={Paths.about}>About</Link> */}
    <ThemeSwitcher {...props} />
  </Wrapper>
);
