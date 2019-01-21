import { Observable } from 'rxjs';
import { ItunesResponse } from '../Models/ItunesResult';
import { BaseService } from './BaseService';

export interface IParam {
  entity?: string;
  term: string;
  media?: string;
  attribute?: string;
  limit?: number;
  lang?: string;
  explicit?: string;
}
class ItunesService extends BaseService {
  public searchArtist(artist: string): Observable<ItunesResponse> {
    return this.fetch$<ItunesResponse>('/search', {
      attribute: 'artistTerm',
      entity: 'musicArtist',
      limit: 50,
      media: 'music',
      term: artist
    });
  }
}

export const iTunesService = new ItunesService('https://itunes.apple.com');
