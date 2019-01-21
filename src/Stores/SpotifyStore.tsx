import { observable } from 'mobx';
import { IAlbum } from 'src/Models/SpotifyModels/SpotifyArtistsAlbumResults';
import { IArtist } from 'src/Models/SpotifyModels/SpotifyArtistsResults';

import {
  IArtistAlbumResponse,
  IArtistResponse
} from 'src/Models/SpotifyResponse';
import { spotifyService } from 'src/Services/SpotifyService';

import { BaseStore } from './BaseStore';

export class SpotifyStore extends BaseStore<IArtist[]> {
  public artists = observable.map<string, IArtist>();
  public artistsAlbum = observable.map<string, IAlbum[]>();

  public searchArtist(artist: string) {
    this.isLoading = true;
    spotifyService
      .searchArtist(artist)
      .subscribe(
        this.updateArtistData(artist),
        this.updateError,
        this.stopLoading
      );
  }

  public searchArtistWithId(id: string) {
    this.isLoading = true;
    spotifyService
      .searchArtistWithId(id)
      .subscribe(this.updateArtist, this.updateError, this.stopLoading);
  }

  public searchArtistAlbums(artistId: string) {
    this.isLoading = true;
    spotifyService
      .searchArtistAlbum(artistId)
      .subscribe(
        this.updateArtistAlbum(artistId),
        this.updateError,
        this.stopLoading
      );
  }

  private updateArtistData = (artist: string) => (
    response: IArtistResponse
  ) => {
    this.data.set(artist, response.artists.items);

    response.artists.items.forEach(this.updateArtist);
  };

  private updateArtistAlbum = (artistId: string) => (
    response: IArtistAlbumResponse
  ) => {
    this.artistsAlbum.set(artistId, response.items);
  };

  private updateArtist = (artist: IArtist) => {
    this.artists.set(artist.id, artist);
  };
}
