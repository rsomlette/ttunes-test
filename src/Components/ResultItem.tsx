import * as React from 'react';
import styled from 'styled-components';

interface IProps {
	item: {
		wrapperType: string;
		kind: string;
		artistId: number;
		collectionId: number;
		trackId: number;
		artistName: string;
		collectionName: string;
		trackName: string;
		collectionCensoredName: string;
		trackCensoredName: string;
		artistViewUrl: string;
		collectionViewUrl: string;
		trackViewUrl: string;
		previewUrl: string;
		artworkUrl30: string;
		artworkUrl60: string;
		artworkUrl100: string;
		collectionPrice: number;
		trackPrice: number;
		releaseDate: string;
		collectionExplicitness: string;
		trackExplicitness: string;
		discCount: number;
		discNumber: number;
		trackCount: number;
		trackNumber: number;
		trackTimeMillis: number;
		country: string;
		currency: string;
		primaryGenreName: string;
		isStreamable: boolean;
	};
}

const Wrapper = styled.div`
	margin-top: 5px;
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
