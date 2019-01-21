import { action, observable } from 'mobx';
import { isNotEmpty, isValidName } from 'src/Validations/ValidationRules';
import { validate } from 'src/Validations/Validator';

export class ArtistSearchStore {
  @observable public artist: string = '';
  @observable public isValid: boolean = false;
  @observable public error: string = '';

  @action public update = (value: string, name: string) => {
    const { isValid, message: error } = this.validateFields(value);
    this.artist = value;
    this.isValid = isValid;
    this.error = error;
  };

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
