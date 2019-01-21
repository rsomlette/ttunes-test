import * as React from 'react';
import styled from 'src/lib/styled-component';

import { IArtist } from 'src/Models/SpotifyModels/SpotifyArtistsResults';
// import { ItunesResponse, ItunesResult } from '../Models/ItunesResult';
// import { ResultItem } from './Cards/ResultItem';
import ArtistItemCard from './Cards/ArtistItemCard';
import { Loader } from './Reusables/Loader';

interface IProps {
  artists?: IArtist[];
  isLoading: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export class ItunesContainer extends React.Component<IProps, {}> {
  public renderResults = (artists?: IArtist[]) => {
    if (artists == null || artists.length < 1) {
      return null;
    }
    return artists.map((result: IArtist) => {
      return (
        <ArtistItemCard
          key={result.id}
          id={result.id}
          artist={result.name}
          followers={result.followers.total}
          ratings={result.popularity}
          coverImg={
            result.images && result.images.length > 0
              ? result.images[0].url
              : ''
          }
        />
      );
    });
  };

  public render() {
    const { artists, isLoading } = this.props;

    return (
      <Wrapper>
        <Loader isLoading={isLoading} />
        <ResultContainer>{this.renderResults(artists)}</ResultContainer>
      </Wrapper>
    );
  }
}
