import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Paths } from '../../routes';

import { Header } from '../../Components/header/header.component';
import { NotFound } from '../../Components/not-found/not-found.component';
import { About } from '../About/About';
import ArtistSearch from '../ArtistSearch/ArtistSearch';

class Home extends React.Component {
  public render() {
    return (
      <main>
        <Header />
        <Switch>
          <Route exact={true} path={Paths.home} component={ArtistSearch} />
          <Route exact={true} path={Paths.about} component={About} />
          <Route component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default Home;
