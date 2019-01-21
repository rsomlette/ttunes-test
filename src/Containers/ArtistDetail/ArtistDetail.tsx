import { inject, observer } from 'mobx-react';

import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import AlbumCard from 'src/Components/Cards/AlbumCard';
import { Loader } from 'src/Components/Reusables/Loader';
import { IAlbum } from 'src/Models/SpotifyModels/SpotifyArtistsAlbumResults';
import { SpotifyStore } from 'src/Stores/SpotifyStore';
import { AlbumsContainer } from './styledComponents';

interface IPathParams {
  id: string;
}

interface IProps extends RouteComponentProps<IPathParams> {
  spotifyStore: SpotifyStore;
}

@inject('spotifyStore')
@observer
export class ArtistDetail extends React.Component<IProps, {}> {
  public componentDidMount() {
    const { spotifyStore, match } = this.props;

    const artistID = match.params ? match.params.id : '';

    if (spotifyStore && artistID) {
      if (!spotifyStore.artists.get(artistID)) {
        spotifyStore.searchArtistWithId(artistID);
      }

      spotifyStore.searchArtistAlbums(artistID);
    }
  }

  public renderAlbums = (artistAlbums?: IAlbum[]) => {
    if (!artistAlbums || artistAlbums.length < 1) {
      return null;
    }

    return artistAlbums.map(artistAlbum => (
      <AlbumCard
        key={artistAlbum.id}
        id={artistAlbum.id}
        album={artistAlbum.name}
        releaseDate={artistAlbum.release_date}
        artist={
          artistAlbum.artists && artistAlbum.artists.length > 0
            ? artistAlbum.artists[0].name
            : ''
        }
        tracks={artistAlbum.total_tracks}
        coverImg={
          artistAlbum.images && artistAlbum.images.length > 0
            ? artistAlbum.images[0].url
            : ''
        }
        externalLink={artistAlbum.external_urls.spotify}
      />
    ));
  };

  public render() {
    const { spotifyStore, match } = this.props;

    if (spotifyStore) {
      const { artistsAlbum, artists, isLoading } = spotifyStore;

      const artistID = match.params ? match.params.id : '';

      const artist = artists.get(artistID);
      const artistAlbums = artistsAlbum.get(artistID);

      return (
        <div>
          <Loader isLoading={isLoading} />
          <div>
            <div>
              <h3>{artist ? artist.name : ''}</h3>
              <div>Albums</div>
            </div>
            <AlbumsContainer>{this.renderAlbums(artistAlbums)}</AlbumsContainer>
          </div>
        </div>
      );
    }

    return <div>No results</div>;
  }
}
