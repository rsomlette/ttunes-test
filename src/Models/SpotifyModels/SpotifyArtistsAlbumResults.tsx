export interface IAlbum {
  album_group: IAlbumType;
  album_type: IAlbumType;
  artists: IArtist[];
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  name: string;
  release_date: Date;
  release_date_precision: IReleaseDatePrecision;
  total_tracks: number;
  type: IItemType;
  uri: string;
}

export enum IAlbumType {
  Single = 'single'
}

export interface IArtist {
  external_urls: IExternalUrls;
  href: string;
  id: string;
  name: string;
  type: IArtistType;
  uri: string;
}

export interface IExternalUrls {
  spotify: string;
}

export enum IArtistType {
  Artist = 'artist'
}

export interface IImage {
  height: number;
  url: string;
  width: number;
}

export enum IReleaseDatePrecision {
  Day = 'day'
}

export enum IItemType {
  Album = 'album'
}
