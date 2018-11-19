import * as React from 'react';
import styled from 'src/lib/styled-component';
import { ItunesResult } from '../Models/ItunesResult';

interface IProps {
  item: ItunesResult;
}

const Wrapper = styled.div`
  margin-top: 6px;
  padding: 6px;
  border: 1px solid black;
`;

const Title = styled.span`
  font-weight: bold;
`;

export const ResultItem = (props: IProps) => (
  <Wrapper>
    <div>
      <Title>Artist:</Title> {props.item.artistName}
    </div>
    <div>
      <Title>Album:</Title> {props.item.collectionName}
    </div>
    <div>
      <Title>Title:</Title> {props.item.trackName}
    </div>
    <div>
      <Title>Collection price:</Title> {props.item.collectionPrice}
    </div>
    <div>
      <Title>Release date:</Title> {props.item.releaseDate}
    </div>
    <div>
      <img src={props.item.artworkUrl100} />
      <audio controls={true}>
        <source src={props.item.previewUrl} />
      </audio>
    </div>
  </Wrapper>
);
