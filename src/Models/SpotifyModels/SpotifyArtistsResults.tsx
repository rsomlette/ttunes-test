export interface IArtistsResult {
  href: string;
  items: IArtist[];
  limit: number;
  next: null;
  offset: number;
  previous: null;
  total: number;
}

export interface IArtist {
  external_urls: IExternalUrls;
  followers: IFollowers;
  genres: any[];
  href: string;
  id: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IExternalUrls {
  spotify: string;
}

export interface IImage {
  height: number;
  url: string;
  width: number;
}

export interface IFollowers {
  href: null;
  total: number;
}
