import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { ItunesContainer } from '../../Components/ItunesContainer';
import { InputText } from '../../Components/Reusables/InputText';

import { ItunesStore } from '../../Stores/ItunesStore';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface IState {
  value: string;
}

interface IProps {
  itunesStore?: ItunesStore;
}

@inject('itunesStore')
@observer
class ItunesSearch extends React.Component<IProps, IState> {
  public state = {
    value: ''
  };

  public onChange = (value: string) => {
    this.setState({ value });
  };

  public performSearch = (e: any) => {
    e.preventDefault();

    const { itunesStore } = this.props;
    if (itunesStore) {
      itunesStore.search({
        entity: 'musicTrack',
        term: this.state.value
      });
    }
  };

  public render() {
    const { value } = this.state;
    const { itunesStore } = this.props;

    const searchResult = itunesStore
      ? itunesStore.searchResult.get(value)
      : null;
    const isLoading = itunesStore ? itunesStore.isLoading : false;

    return (
      <Wrapper>
        <form onSubmit={this.performSearch}>
          <InputText
            name="input"
            label="Enter artist"
            value={value}
            onChange={this.onChange}
          />
        </form>
        <ItunesContainer searchResult={searchResult} isLoading={isLoading} />
      </Wrapper>
    );
  }
}

export default ItunesSearch;
