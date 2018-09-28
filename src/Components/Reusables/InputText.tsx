import classNames from 'classnames';
import * as React from 'react';
import styled from 'styled-components';

interface IUnderline {
  inError?: boolean;
}

const Underline = styled.span``;
const CustomInput = styled.input<IUnderline>`
  border: 0;
  padding: 4px 0;
  border-bottom: 1px solid #ccc;
  background-color: transparent;

  font: 15px/24px 'Lato', Arial, sans-serif;
  color: #333;
  width: 100%;
  box-sizing: border-box;
  letter-spacing: 1px;

  &:focus {
    outline: none;
  }

  & ~ ${Underline} {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 99;
  }
  & ~ ${Underline}:before, & ~ ${Underline}:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: ${({ inError }) => (inError ? 'red' : '#3399ff')};
    transition: 0.4s;
  }

  & ~ ${Underline}:after {
    left: auto;
    right: 0;
  }

  &:focus
    ~ ${Underline}:before,
    &:focus
    ~ ${Underline}:after,
    &.has-content
    ~ ${Underline}:before,
    &.has-content
    ~ ${Underline}:after {
    width: 50%;
    transition: 0.4s;
  }

  & ~ label {
    position: absolute;
    left: 0;
    width: 100%;
    top: 9px;
    color: #aaa;
    transition: 0.3s;
    z-index: -1;
    letter-spacing: 0.5px;
  }

  &:focus ~ label,
  &.has-content ~ label {
    top: -16px;
    font-size: 12px;
    color: ${({ inError }) => (inError ? 'red' : '#3399ff')};
    transition: 0.3s;
  }
`;

const CustomWrapper = styled.div`
  position: relative;
`;

const ComponentWrapper = styled.div`
  margin: 16px 0;
`;

const ErrorWrapper = styled.div`
  margin-top: 4px;
  font-size: 14px;
`;

interface IProps {
  label: string;
  name: string;
  value?: string;
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

    const inputClass = classNames({ 'has-content': value });
    const inError = !isValid && error != null && error !== '';
    return (
      <ComponentWrapper>
        <CustomWrapper>
          <CustomInput
            type="search"
            className={inputClass}
            name={name}
            value={value}
            onChange={this.handleOnChange}
            inError={inError}
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
