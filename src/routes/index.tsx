import { compile } from 'path-to-regexp';

export const Paths = {
  about: '/about',
  artist: '/artist/:id/albums',
  authorize: '/authorize',
  home: '/',
  itunesSearch: '/itunesSearch'
};

export const Links = {
  artist: compile(Paths.artist)
};
