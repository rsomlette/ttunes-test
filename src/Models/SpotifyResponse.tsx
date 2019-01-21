import { IAlbum } from './SpotifyModels/SpotifyArtistsAlbumResults';
import { IArtistsResult } from './SpotifyModels/SpotifyArtistsResults';

export interface IArtistAlbumResponse {
  href: string;
  items: IAlbum[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface IArtistResponse {
  artists: IArtistsResult;
}
