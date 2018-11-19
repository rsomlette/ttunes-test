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
  public search(params: IParam): Observable<ItunesResponse> {
    return this.fetch$<ItunesResponse>('/search', params);
  }
}

export const iTunesService = new ItunesService('https://itunes.apple.com');
