import { inject, observer } from 'mobx-react';
import * as queryString from 'query-string';
import * as React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';

import { Loader } from 'src/Components/Reusables/Loader';
import { AuthenticationStore } from 'src/Stores/AuthenticationStore';

import styled from 'src/lib/styled-component';
import { Paths } from '../../routes';

interface IProps extends RouteComponentProps {
  authenticationStore: AuthenticationStore;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  a {
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.link};
    font-size: 14px;

    &:hover {
      color: ${({ theme }) => theme.colors.textHover};
    }
  }
`;

@inject('authenticationStore')
@observer
export default class Authorize extends React.Component<IProps> {
  public componentDidMount() {
    const { authenticationStore, location } = this.props;
    const params = location.hash
      ? queryString.parse(location.hash)
      : queryString.parse(location.search);

    if (authenticationStore) {
      authenticationStore.saveAuthentication(params);
    }
  }

  public render() {
    const { authenticationStore } = this.props;

    if (authenticationStore && !authenticationStore.authentication.token) {
      if (authenticationStore.authentication.error) {
        return (
          <Wrapper>
            <h3>Authorization screen</h3>
            Authorization denied.
            <Link to={Paths.home}>Back</Link>
          </Wrapper>
        );
      }
      return (
        <Wrapper>
          <h3>Authorization screen</h3>
          <Loader isLoading={true} />
        </Wrapper>
      );
    }

    return <Redirect to={Paths.home} from={Paths.authorize} push={true} />;
  }
}
