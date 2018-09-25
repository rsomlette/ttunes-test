import * as React from 'react';

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

export const ResultItem = (props: IProps) => (
	<div>
		<div>{props.item.wrapperType}</div>
		<div>{props.item.artistName}</div>
		<div>{props.item.trackName}</div>
		<div>{props.item.collectionPrice}</div>
		<div>{props.item.releaseDate}</div>
		<img src={props.item.artworkUrl60} />
		<audio controls={true}>
			<source src={props.item.previewUrl} />
		</audio>
	</div>
);
