import * as React from 'react';
import styled from 'src/lib/styled-component';
import { ItunesResponse, ItunesResult } from '../Models/ItunesResult';
import { ResultItem } from './ResultItem';
import { Loader } from './Reusables/Loader';

interface IProps {
  searchResult?: ItunesResponse | null;
  isLoading: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export class ItunesContainer extends React.Component<IProps, {}> {
  public renderResults = (searchResult?: ItunesResponse | null) => {
    if (searchResult == null) {
      return null;
    }
    return searchResult.results.map((result: ItunesResult) => (
      <ResultItem item={result} key={result.trackId} />
    ));
  };

  public render() {
    const { searchResult, isLoading } = this.props;

    return (
      <Wrapper>
        <Loader isLoading={isLoading} />
        {this.renderResults(searchResult)}
      </Wrapper>
    );
  }
}
