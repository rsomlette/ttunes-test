import { ItunesResponse } from '../Models/ItunesResult';

import { IParam, iTunesService } from '../Services/ItunesService';
import { BaseStore } from './BaseStore';

export class ItunesStore extends BaseStore<ItunesResponse> {
  public search(params: IParam) {
    this.isLoading = true;
    iTunesService
      .search(params)
      .subscribe(
        this.updateData(params.term),
        this.updateError,
        this.stopLoading
      );
  }
}
