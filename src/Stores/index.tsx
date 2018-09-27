import { RouterStore } from 'mobx-react-router';

import { ItunesStore } from './ItunesStore';

export const stores = {
  itunesStore: new ItunesStore(),
  routing: new RouterStore()
};
