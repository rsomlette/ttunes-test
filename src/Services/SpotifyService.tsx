import { Observable } from 'rxjs';

import { BaseService } from './BaseService';

import { IArtist } from 'src/Models/SpotifyModels/SpotifyArtistsResults';
import {
  IArtistAlbumResponse,
  IArtistResponse
} from 'src/Models/SpotifyResponse';

class SpotifyService extends BaseService {
  public searchArtist(artist: string): Observable<IArtistResponse> {
    return this.fetch$<IArtistResponse>('/search', {
      limit: 50,
      q: artist,
      type: 'artist'
    });
  }

  public searchArtistWithId(id: string): Observable<IArtist> {
    return this.fetch$<IArtist>(`/artists/${id}`);
  }

  public searchArtistAlbum(artistId: string): Observable<IArtistAlbumResponse> {
    return this.fetch$<IArtistAlbumResponse>(`/artists/${artistId}/albums`);
  }
}

export const spotifyService = new SpotifyService('https://api.spotify.com/v1');
