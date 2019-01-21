import { observable } from 'mobx';

import { spotifyService } from 'src/Services/SpotifyService';

interface IAuthentication {
  token: string;
  expirationDate: Date | null;
}

const INITIAL_STATE_AUTHENTICATION = {
  expirationDate: null,
  token: ''
};

export class AuthenticationStore {
  @observable
  public authentication: IAuthentication = INITIAL_STATE_AUTHENTICATION;

  constructor() {
    this.hydrateAuthentication();
  }

  public saveAuthentication(authentication: any) {
    const token = authentication.access_token;

    const expirationDate = new Date();
    expirationDate.setSeconds(
      expirationDate.getSeconds() + parseInt(authentication.expires_in, 10)
    );

    this.authentication = {
      expirationDate,
      token
    };

    this.persistAuthentication();
  }

  public clearAuthentication() {
    this.authentication = INITIAL_STATE_AUTHENTICATION;
    localStorage.removeItem('authentication');
  }

  private persistAuthentication = () => {
    console.info('saving authentication'); // tslint:disable-line
    this.updatingSpotifyService();
    localStorage.setItem('authentication', JSON.stringify(this.authentication));
  };

  private hydrateAuthentication = () => {
    console.info('attempting hydrating authentication'); // tslint:disable-line
    const persistedAuthentication = localStorage.getItem('authentication');

    if (persistedAuthentication) {
      const authentication = JSON.parse(persistedAuthentication);
      authentication.expirationDate = new Date(authentication.expirationDate);

      if (
        authentication.expirationDate &&
        authentication.expirationDate > new Date()
      ) {
        console.info('hydration success'); // tslint:disable-line
        this.authentication = authentication;

        this.updatingSpotifyService();
      } else {
        console.info('hydration expired'); // tslint:disable-line
        this.clearAuthentication();
      }
    } else {
      console.info('nothing to rehydrate'); // tslint:disable-line
    }
  };

  private updatingSpotifyService = () => {
    spotifyService.api.setHeader(
      'Authorization',
      `Bearer ${this.authentication.token}`
    );
  };
}
