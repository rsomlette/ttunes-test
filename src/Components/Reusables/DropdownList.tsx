import * as React from 'react';
import styled from 'src/lib/styled-component';
import DropdownArrow from '../../assets/images/ic-dropdown-arrow.svg';

const ComponentWrapper = styled.div`
  width: 100%;
`;

const CustomWrapper = styled.div`
  position: relative;
  margin: 16px 0 16px;
`;

const CustomSelect = styled.select`
  color: ${({ theme }) => theme.colors.text};
  appearance: none;
  outline: none;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};

  background: url(${DropdownArrow}) no-repeat;
  background-position: 100%;
  background-size: 1em;

  font-size: 14px;
  width: 100%;
  height: 100%;

  padding: 0.5em 0;

  transform: all 200ms linear;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.textHover};
    border-bottom-color: ${({ theme }) => theme.colors.textHover};
  }
`;

const ErrorWrapper = styled.div`
  margin-top: 4px;
  font-size: 14px;
`;

interface IProps {
  onChange: (value: string, name: string) => void;
  error: string;
  options?: IOption[];
  selectedValue?: string | null;
  isValid?: boolean;
  title?: string;
}

interface IOption {
  value: string | number;
  key: string | number;
}

export class DropdownList extends React.Component<IProps> {
  public onChange = (event: any) => {
    this.props.onChange(event.target.value, 'type');
  };

  public render() {
    const { options, selectedValue, error, title } = this.props;

    if (options == null || options.length === 0) {
      return null;
    }
    return (
      <ComponentWrapper>
        <CustomWrapper>
          <CustomSelect
            name="type"
            id="type"
            onChange={this.onChange}
            value={selectedValue != null ? selectedValue : ''}
          >
            {this.renderTitle(title)}
            {this.renderOptions(options)}
          </CustomSelect>
          {this.renderError(error)}
        </CustomWrapper>
      </ComponentWrapper>
    );
  }

  private renderOptions = (options: IOption[]) =>
    options.map(option => (
      <option key={option.key} value={option.key}>
        {option.value}
      </option>
    ));

  private renderTitle = (title?: string) => {
    if (title == null) {
      return null;
    }
    return (
      <option value="" disabled={true}>
        {title}
      </option>
    );
  };

  private renderError = (error: string) => {
    if (!error) {
      return null;
    }
    return <ErrorWrapper>{error}</ErrorWrapper>;
  };
}
