import * as React from 'react';

import {
  CoverImage,
  DateWrapper,
  DetailContainer,
  SpotifyPreview,
  Subtitle,
  TextContent,
  Title,
  Wrapper
} from './StyledComponents';

interface IProps {
  id: string;
  album: string;
  artist: string;
  releaseDate: Date;
  tracks: number;
  coverImg: string;
  externalLink: string;
}

export default ({
  id,
  album,
  artist,
  releaseDate,
  tracks,
  externalLink,
  coverImg
}: IProps) => (
  <Wrapper>
    <CoverImage src={coverImg} />
    <DetailContainer>
      <TextContent>
        <Title>{album}</Title>
        <Subtitle>{artist}</Subtitle>
        <DateWrapper>{releaseDate}</DateWrapper>
        <Subtitle>{tracks} tracks</Subtitle>
      </TextContent>
      <SpotifyPreview href={externalLink} target="_blank">
        Preview on Spotify
      </SpotifyPreview>
    </DetailContainer>
  </Wrapper>
);
