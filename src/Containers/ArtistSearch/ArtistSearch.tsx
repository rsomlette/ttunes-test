import { inject, observer } from 'mobx-react';
import * as React from 'react';
import styled from 'src/lib/styled-component';

import { ItunesContainer } from '../../Components/ItunesContainer';
import { InputText } from '../../Components/Reusables/InputText';
import { isNotEmpty, isValidName } from '../../Validations/ValidationRules';
import { validate } from '../../Validations/Validator';

import { Button } from 'src/Components/Reusables/Button';
import { SpotifyStore } from 'src/Stores/SpotifyStore';

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

  transition: margin-top ease-in-out 200ms;

  &.no-result {
    margin-top: 30vh;
  }

  & > * {
    min-width: 100px;
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
  spotifyStore?: SpotifyStore;
}

@inject('spotifyStore', 'itunesStore')
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
    const { spotifyStore } = this.props;
    const { artist } = this.state;
    const artistValue = artist.value;

    if (spotifyStore && artistValue) {
      spotifyStore.searchArtist(artistValue);
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
    const { spotifyStore } = this.props;
    const {
      value: valueArtist,
      error: errorArtist,
      isValid: isValidArtist
    } = this.state.artist;

    /* tslint:disable */

    const searchResult =
      spotifyStore && valueArtist ? spotifyStore.data.get(valueArtist) : [];

    const isLoading = spotifyStore ? spotifyStore.isLoading : false;
    const itunesError = spotifyStore ? spotifyStore.error : null;

    /* tslint:enable */
    return (
      <Wrapper>
        <CustomForm
          onSubmit={this.performSearch}
          className={searchResult && searchResult.length > 0 ? '' : 'no-result'}
        >
          <InputText
            name="artist"
            label="Search for an artist..."
            value={valueArtist}
            onChange={this.onChange}
            error={errorArtist}
            isValid={isValidArtist}
          />
          <Button type="submit">Search</Button>
        </CustomForm>
        {this.renderError(itunesError)}
        <ItunesContainer artists={searchResult} isLoading={isLoading} />
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
