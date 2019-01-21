import { ItunesResponse } from '../Models/ItunesResult';

import { iTunesService } from '../Services/ItunesService';
import { BaseStore } from './BaseStore';

export class ItunesStore extends BaseStore<ItunesResponse> {
  public searchArtist(artist: string) {
    this.isLoading = true;
    iTunesService
      .searchArtist(artist)
      .subscribe(this.updateData(artist), this.updateError, this.stopLoading);
  }
}
