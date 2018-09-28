import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'styled-components';

import { ItunesContainer } from '../../Components/ItunesContainer';
import { InputText } from '../../Components/Reusables/InputText';

import { ItunesStore } from '../../Stores/ItunesStore';
import { isNotEmpty, isValidName } from '../../Validations/ValidationRules';
import { validate } from '../../Validations/Validator';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface IState {
  [x: string]: IField;
}

interface IField {
  value: string;
  isValid: boolean;
  error: string;
}
interface IProps {
  itunesStore?: ItunesStore;
}

@inject('itunesStore')
@observer
class ArtistSearch extends React.Component<IProps, IState> {
  public state = {
    input: { value: '', isValid: false, error: '' }
  };

  public onChange = (value: string, name: string) => {
    const { isValid, message: error } = this.validateFields(value);
    this.setState({ [name]: { value, isValid, error } });
  };

  public performSearch = (e: any) => {
    e.preventDefault();

    const { itunesStore } = this.props;
    if (itunesStore) {
      itunesStore.search({
        entity: 'musicTrack',
        term: this.state.input.value
      });
    }
  };

  public render() {
    const { value, error, isValid } = this.state.input;
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
            error={error}
            isValid={isValid}
          />
        </form>
        <ItunesContainer searchResult={searchResult} isLoading={isLoading} />
      </Wrapper>
    );
  }

  private validateFields = (value: string) => {
    return validate(
      [
        { handler: isNotEmpty, message: 'The field should not be empty' },
        { handler: isValidName, message: 'This does not look like a name' }
      ],
      value
    );
  };
}

export default ArtistSearch;
