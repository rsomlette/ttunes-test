import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'src/lib/styled-component';

import { ItunesContainer } from '../../Components/ItunesContainer';
import { InputText } from '../../Components/Reusables/InputText';

import { Button } from 'src/Components/Reusables/Button';
import { DropdownList } from 'src/Components/Reusables/DropdownList';
import { ItunesStore } from '../../Stores/ItunesStore';
import { isNotEmpty, isValidName } from '../../Validations/ValidationRules';
import { validate } from '../../Validations/Validator';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CustomForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 1em;
  width: 500px;

  & > * {
    min-width: 300px;
    &:not(:last-child) {
      margin-right: 16px;
    }
  }
`;

interface IState {
  [x: string]: IField;
}

interface IField {
  value: string | null;
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
    artist: { value: null, isValid: false, error: '' },
    type: { value: null, isValid: false, error: '' }
  };

  public onChange = (value: string, name: string) => {
    const { isValid, message: error } = this.validateFields(value);
    this.setState({ [name]: { value, isValid, error } });
  };

  public performSearch = (e: any) => {
    e.preventDefault();
    const { itunesStore } = this.props;
    const { type, artist } = this.state;
    const artistValue = artist.value;
    const typeValue = type.value;

    if (itunesStore && artistValue && typeValue) {
      itunesStore.search({
        attribute: typeValue === 'all' ? undefined : typeValue,
        entity: 'musicTrack',
        term: artistValue
      });
    }
  };

  public renderError = (error: Error | null) => {
    if (error == null) {
      return null;
    }
    return (
      <div>
        <h3>{error.name}</h3>
        <p>{error.message}</p>
      </div>
    );
  };

  public render() {
    const { itunesStore } = this.props;
    const {
      value: valueArtist,
      error: errorArtist,
      isValid: isValidArtist
    } = this.state.artist;
    const {
      value: valueType,
      error: errorType
      // isValid: isValidType
    } = this.state.type;

    const searchResult =
      itunesStore && valueArtist ? itunesStore.data.get(valueArtist) : null;
    const isLoading = itunesStore ? itunesStore.isLoading : false;
    const itunesError = itunesStore ? itunesStore.error : null;

    return (
      <Wrapper>
        <CustomForm onSubmit={this.performSearch}>
          <InputText
            name="artist"
            label="Enter artist"
            value={valueArtist}
            onChange={this.onChange}
            error={errorArtist}
            isValid={isValidArtist}
          />
          <DropdownList
            onChange={this.onChange}
            options={[
              { key: 'all', value: 'All' },
              { key: 'mixTerm', value: 'Mix Term' },
              { key: 'genreIndex', value: 'Genre' },
              { key: 'artistTerm', value: 'Artist' },
              { key: 'composerTerm', value: 'Composer' },
              { key: 'albumTerm', value: 'Album' },
              { key: 'ratingIndex', value: 'Rating' },
              { key: 'songTerm', value: 'Song' }
            ]}
            title={'Selectionner un filtre'}
            selectedValue={valueType}
            error={errorType}
          />
          <Button type="submit">Chercher</Button>
        </CustomForm>
        {this.renderError(itunesError)}
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
