import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Paths } from '../../routes';

import withTheme from 'src/Hoc/withTheme';
import styled from 'src/lib/styled-component';
import { AuthenticationStore } from 'src/Stores/AuthenticationStore';

import { Header } from '../../Components/header/header.component';
import { NotFound } from '../../Components/not-found/not-found.component';

import { About } from '../About/About';
import { ArtistDetail } from '../ArtistDetail/ArtistDetail';
import ArtistSearch from '../ArtistSearch/ArtistSearch';
import Authorize from '../Authorize';
import MainScreen from '../MainScreen';

interface IProps {
  authenticationStore: AuthenticationStore;
  currentTheme: string;
  switchTheme: any;
  routing: RouterStore;
}

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};

  transition: all linear 200ms;

  main {
    margin: 16px;
  }
`;

@inject('routing', 'authenticationStore')
@observer
class Home extends React.Component<IProps> {
  public renderAuthenticatedRoutes = (location: any) => (
    <Switch location={location}>
      <Route exact={true} path={Paths.home} component={ArtistSearch} />
      <Route exact={true} path={Paths.about} component={About} />
      <Route exact={true} path={Paths.artist} component={ArtistDetail} />
      <Route path={Paths.authorize} component={Authorize} />
      <Route component={NotFound} />
    </Switch>
  );

  public renderGuestRoutes = (location: any) => (
    <Switch location={location}>
      <Route exact={true} path={Paths.about} component={About} />
      <Route path={Paths.authorize} component={Authorize} />

      <Route component={MainScreen} />
    </Switch>
  );

  public renderRoutes = () => {
    const { routing, authenticationStore } = this.props;

    if (
      authenticationStore &&
      authenticationStore.authentication.expirationDate &&
      authenticationStore.authentication.expirationDate > new Date()
    ) {
      return this.renderAuthenticatedRoutes(routing.location);
    }

    return this.renderGuestRoutes(routing.location);
  };

  public render() {
    return (
      <PageWrapper>
        <Header {...this.props} />
        <main>{this.renderRoutes()}</main>
      </PageWrapper>
    );
  }
}

export default withTheme(Home);
