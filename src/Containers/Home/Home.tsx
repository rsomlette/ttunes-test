import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Paths } from '../../routes';

import withTheme from 'src/Hoc/withTheme';
import styled from 'src/lib/styled-component';
import { Header } from '../../Components/header/header.component';
import { NotFound } from '../../Components/not-found/not-found.component';
import { About } from '../About/About';
import ArtistSearch from '../ArtistSearch/ArtistSearch';

interface IProps {
  currentTheme: string;
  switchTheme: any;
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
`;
class Home extends React.Component<IProps> {
  public render() {
    return (
      <main>
        <PageWrapper>
          <Header {...this.props} />
          <Switch>
            <Route exact={true} path={Paths.home} component={ArtistSearch} />
            <Route exact={true} path={Paths.about} component={About} />
            <Route component={NotFound} />
          </Switch>
        </PageWrapper>
      </main>
    );
  }
}

export default withTheme(Home);
