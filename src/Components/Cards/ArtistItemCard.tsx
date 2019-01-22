import * as React from 'react';

import styled from 'src/lib/styled-component';
import { Links } from 'src/routes';
import Artist from '../../assets/images/artist.svg';
import { Ratings } from '../Reusables/Ratings';
import {
  ArtistContent,
  CoverImage,
  DetailContainer,
  LinkWrapper,
  Subtitle,
  Title
} from './StyledComponents';

const RatingWrapper = styled(Ratings)`
  margin-top: auto;
`;

interface IProps {
  id: string;
  artist: string;
  followers: number;
  ratings: number;
  coverImg: string;
}

export default ({ id, artist, followers, ratings, coverImg }: IProps) => {
  const coverImgSrc = coverImg ? coverImg : Artist;
  return (
    <LinkWrapper to={Links.artist({ id })}>
      <CoverImage src={coverImgSrc} />
      <DetailContainer>
        <ArtistContent>
          <Title>{artist}</Title>
          <Subtitle>{followers} followers</Subtitle>
          <RatingWrapper rating={ratings} max={100} />
        </ArtistContent>
      </DetailContainer>
    </LinkWrapper>
  );
};
