import { observable } from 'mobx';

export class BaseStore<T> {
  public data = observable.map<string, T>();
  @observable
  public error: Error | null = null;
  @observable
  public isLoading: boolean = false;

  public updateData = (key: string) => (results: T) => {
    this.data.set(key, results);
  };

  public updateError = (error: Error) => {
    this.error = error;
  };

  public stopLoading = () => {
    this.isLoading = false;
  };
}
