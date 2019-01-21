import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'src/lib/styled-component';

import { ArtistsContainer } from '../../Components/ArtistsContainer';
import { InputText } from '../../Components/Reusables/InputText';

import { Button } from 'src/Components/Reusables/Button';
import { ArtistSearchStore } from 'src/Stores/ArtistSearchStore';
import { AuthenticationStore } from 'src/Stores/AuthenticationStore';
import { SpotifyStore } from 'src/Stores/SpotifyStore';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1em;
  min-width: 500px;

  transition: all ease-in-out 200ms;

  @media (max-width: 600px) {
    min-width: 95vw;
  }

  &.no-result {
    margin-top: 30vh;
  }

  & > * {
    min-width: 100px;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

interface IProps {
  spotifyStore?: SpotifyStore;
  artistSearchStore: ArtistSearchStore;
  authenticationStore: AuthenticationStore;
}

@inject(
  'spotifyStore',
  'itunesStore',
  'artistSearchStore',
  'authenticationStore'
)
@observer
class ArtistSearch extends React.Component<IProps> {
  public onChange = (value: string, name: string) => {
    const { artistSearchStore } = this.props;
    // TODO: Add debounce if necessary;
    if (artistSearchStore) {
      artistSearchStore.update(value, name);
    }
  };

  public performSearch = (e: any) => {
    e.preventDefault();
    const { spotifyStore } = this.props;
    const { artistSearchStore } = this.props;
    const artistValue = artistSearchStore.artist;

    if (spotifyStore && artistValue) {
      spotifyStore.searchArtist(artistValue);
    }
  };

  public renderError = (error: Error | null) => {
    if (error == null) {
      return null;
    }
    if (error.message === 'CLIENT_ERROR') {
      this.props.authenticationStore.clearAuthentication();
    }

    return (
      <div>
        <h3>{error.name}</h3>
        <p>{error.message}</p>
      </div>
    );
  };

  public render() {
    const { spotifyStore, artistSearchStore } = this.props;
    const {
      artist: valueArtist,
      error: errorArtist,
      isValid: isValidArtist
    } = artistSearchStore;

    const searchResult =
      spotifyStore && valueArtist ? spotifyStore.data.get(valueArtist) : [];

    const isLoading = spotifyStore ? spotifyStore.isLoading : false;
    const itunesError = spotifyStore ? spotifyStore.error : null;

    return (
      <Wrapper>
        <CustomForm
          onSubmit={this.performSearch}
          className={searchResult && searchResult.length > 0 ? '' : 'no-result'}
        >
          <InputText
            name="artist"
            label="Search for an artist..."
            value={valueArtist}
            onChange={this.onChange}
            error={errorArtist}
            isValid={isValidArtist}
          />
          <Button type="submit">Search</Button>
        </CustomForm>
        {this.renderError(itunesError)}
        <ArtistsContainer artists={searchResult} isLoading={isLoading} />
      </Wrapper>
    );
  }
}

export default ArtistSearch;
