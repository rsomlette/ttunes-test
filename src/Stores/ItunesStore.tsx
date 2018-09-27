import { observable } from 'mobx';
import { ItunesResponse } from '../Models/ItunesResult';

import { IParam, iTunesService } from '../Services/ItunesService';

export class ItunesStore {
  public searchResult = observable.map<string, ItunesResponse>();
  @observable
  public error: Error | null = null;
  @observable
  public isLoading: boolean = false;

  public search(params: IParam) {
    this.isLoading = true;
    iTunesService
      .search(params)
      .subscribe(
        this.updateSearchResult(params.term),
        this.updateError,
        this.stopLoading
      );
  }

  private updateSearchResult = (key: string) => (results: ItunesResponse) => {
    this.searchResult.set(key, results);
  };

  private updateError = (error: Error) => {
    this.error = error;
  };

  private stopLoading = () => {
    this.isLoading = false;
  };
}
