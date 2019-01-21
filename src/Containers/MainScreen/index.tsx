import * as React from 'react';

import SpotifyLogo from '../../assets/images/ic-spotify.png';
import styled from '../../lib/styled-component';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh;
`;

const SpotifyLogin = styled.a`
  display: flex;
  align-content: center;
  position: relative;

  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 10px 70px;
  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
    cursor: pointer;
  }

  img {
    position: absolute;
    right: 10px;
    height: 20px;
  }
`;

const CLIENT_ID = 'cfb16b95614d4dd09b76cb01b6c8449c'


export default class MainScreen extends React.Component {
public render() {
  const config = {
    clientId: CLIENT_ID,
    redirectUrl: `${window.location.origin}/authorize`
  };

  const authUrl = encodeURI(
    `https://accounts.spotify.com/authorize?client_id=${
      config.clientId
    }&redirect_uri=${
      config.redirectUrl
    }&scope=user-read-private user-read-email&response_type=token&state=123`
  );

  return (
    <Wrapper>
      <SpotifyLogin href={authUrl}>
        Login with Spotify
        <img src={SpotifyLogo} alt="spotify logo" />
      </SpotifyLogin>
    </Wrapper>
  );
};
}