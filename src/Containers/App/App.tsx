import { Provider } from 'mobx-react';
import * as React from 'react';

import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import { Router } from 'react-router';

import { stores } from '../../Stores';
import Home from '../Home/Home';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, stores.routing);

class App extends React.Component {
  public render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <Home />
        </Router>
      </Provider>
    );
  }
}

export default App;
