import * as React from 'react';

import { Link } from 'react-router-dom';
import styled from 'src/lib/styled-component';
import { Links } from 'src/routes';
import Artist from '../../assets/images/artist.svg';
import { Ratings } from '../Reusables/Ratings';
import {
  DetailContainer,
  Subtitle,
  TextContent,
  Title
} from './StyledComponents';

const Wrapper = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 210px;
  width: 160px;

  text-decoration: none;
  margin-bottom: 30px;
  background-color: transparent;

  transition: background-color 200ms linear;

  &:hover {
    background-color: ${({ theme }) => theme.colors.highlight};
  }
`;

const RatingWrapper = styled(Ratings)`
  margin-top: auto;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 115px;
  object-fit: cover;
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
    <Wrapper to={Links.artist({ id })}>
      <CoverImage src={coverImgSrc} />
      <DetailContainer>
        <TextContent>
          <Title>{artist}</Title>
          <Subtitle>{followers} followers</Subtitle>
          <RatingWrapper rating={ratings} max={100} />
        </TextContent>
      </DetailContainer>
    </Wrapper>
  );
};
