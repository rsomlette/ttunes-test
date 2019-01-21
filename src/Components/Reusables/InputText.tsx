import classNames from 'classnames';
import * as React from 'react';
import styled from 'src/lib/styled-component';

interface IUnderline {
  inError?: boolean;
}

const ComponentWrapper = styled.div`
  /* margin-top: 16px;
  margin-bottom: 1.5em; */

  width: 100%;
`;

const CustomWrapper = styled.div`
  position: relative;
  margin: 16px 0;
  /* background-color: goldenrod; */
`;

// For colorfil purpose only
const Input = styled.input<IUnderline>``;

const Underline = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  z-index: 99;
  transition: all 200 linear;
`;

const CustomInput = styled(Input)`
  border: 0;
  padding: 4px 0;
  background-color: transparent !important;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${({ theme }) => theme.colors.primary} inset !important;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text} !important;
  }

  font: 15px/24px 'Lato', Arial, sans-serif;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;

  & ~ ${Underline} {
    background-color: ${({ inError, theme }) =>
      inError ? 'red' : theme.colors.text};
  }

  & ~ ${Underline}:before, & ~ ${Underline}:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: ${({ inError, theme }) =>
      inError ? 'red' : theme.colors.text};
    transition: 0.4s;
  }

  & ~ ${Underline}:after {
    left: auto;
    right: 0;
  }

  & ~ label {
    position: absolute;
    left: 0;
    width: 100%;
    top: 9px;
    color: ${({ inError, theme }) => (inError ? 'red' : theme.colors.text)};
    transition: 0.3s;
    z-index: 1;
    letter-spacing: 0.5px;
  }

  &:hover {
    & ~ label {
      color: ${({ theme }) => theme.colors.textHover};
    }
    & ~ ${Underline} {
      background-color: ${({ inError, theme }) =>
        inError ? 'red' : theme.colors.textHover};
    }
  }

  &.has-content {
    & ~ ${Underline}:before, & ~ ${Underline}:after {
      width: 50%;
      transition: 0.4s;
    }
  }

  &:focus ~ label,
  &.has-content ~ label {
    top: -16px;
    font-size: 12px;
    transition: 0.3s;
  }

  &:focus {
    outline: none;

    & ~ label {
      color: ${({ inError }) => (inError ? 'red' : '#3399ff')};
    }
    & ~ ${Underline}:before, & ~ ${Underline}:after {
      background-color: ${({ inError }) => (inError ? 'red' : '#3399ff')};
    }

    & ~ ${Underline}:before, & ~ ${Underline}:after {
      width: 50%;
      transition: 0.4s;
    }
  }
`;

const ErrorWrapper = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: red;
  font-weight: 100;
`;

interface IProps {
  label: string;
  name: string;
  value?: string | null;
  error: string;
  isValid?: boolean;
  onChange: (value: string, name: string) => void;
}

export class InputText extends React.Component<IProps, {}> {
  public handleOnChange = (event: any) => {
    const { onChange, name } = this.props;

    onChange(event.target.value, name);
  };

  public render() {
    const { label, value, name, isValid, error } = this.props;

    const inputValue = value != null ? value : '';
    const inputClass = classNames({ 'has-content': value });
    const inError = !isValid && error != null && error !== '';
    return (
      <ComponentWrapper>
        <CustomWrapper>
          <CustomInput
            type="search"
            className={inputClass}
            id={name}
            name={name}
            value={inputValue}
            onChange={this.handleOnChange}
            inError={inError}
            autoComplete="off"
          />
          <label htmlFor={name}>{label}</label>
          <Underline />
        </CustomWrapper>
        {this.renderError(error)}
      </ComponentWrapper>
    );
  }

  private renderError = (error: string) => {
    if (!error) {
      return null;
    }
    return <ErrorWrapper>{error}</ErrorWrapper>;
  };
}
