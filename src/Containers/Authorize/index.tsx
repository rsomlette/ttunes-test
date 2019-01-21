import { inject, observer } from 'mobx-react';
import * as queryString from 'query-string';
import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { Loader } from 'src/Components/Reusables/Loader';
import { AuthenticationStore } from 'src/Stores/AuthenticationStore';

import { Paths } from '../../routes';

interface IProps extends RouteComponentProps {
  authenticationStore: AuthenticationStore;
}
/* tslint:disable */
@inject('authenticationStore')
@observer
export default class Authorize extends React.Component<IProps> {
  public componentDidMount() {
    const params = queryString.parse(location.hash);
    console.warn('comp did mount', params); // tslint:disable-line

    const { authenticationStore } = this.props;
    if (authenticationStore) {
      authenticationStore.saveAuthentication(params);
    }
  }

  public render() {
    // spotifyService.searchArtist('30 seconds to mars').subscribe(console.log); // tslint:disable-line
    const { authenticationStore } = this.props;

    if (authenticationStore && !authenticationStore.authentication.token) {
      console.warn('no token, loading');
      return (
        <div>
          <div>Authorization screen</div>
          <Loader isLoading={true} />;
        </div>
      );
    }
    console.warn('token available, redirecting');
    return <Redirect to={Paths.home} from={Paths.authorize} push={true} />;
  }
}
