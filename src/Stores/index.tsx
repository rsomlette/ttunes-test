import { RouterStore } from 'mobx-react-router';

import { AuthenticationStore } from './AuthenticationStore';
import { ItunesStore } from './ItunesStore';
import { SpotifyStore } from './SpotifyStore';

export const stores = {
  authenticationStore: new AuthenticationStore(),
  itunesStore: new ItunesStore(),
  routing: new RouterStore(),
  spotifyStore: new SpotifyStore()
};
