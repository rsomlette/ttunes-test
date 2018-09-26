import classNames from "classnames";
import * as React from "react";
import styled from "styled-components";

const Underline = styled.span``;
const CustomInput = styled.input`
    border: 0;
    padding: 4px 0;
    border-bottom: 1px solid #ccc;
    background-color: transparent;

    font: 15px/24px "Lato", Arial, sans-serif;
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
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 100%;
        background-color: #3399ff;
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
        color: #3399ff;
        transition: 0.3s;
    }
`;

const CustomWrapper = styled.div`
    margin: 16px 0;
    position: relative;
`;

interface IProps {
    label: string;
    name: string;
    value?: string;
    onChange: (value: string, name: string) => void;
}

export class InputText extends React.Component<IProps, {}> {
    public handleOnChange = (event: any) => {
        const { onChange, name } = this.props;

        onChange(event.target.value, name);
    };

    public render() {
        const { label, value, name } = this.props;

        const inputClass = classNames({ "has-content": value });
        return (
            <CustomWrapper>
                <CustomInput
                    type="search"
                    className={inputClass}
                    name={name}
                    value={value}
                    onChange={this.handleOnChange}
                />
                <label htmlFor={name}>{label}</label>
                <Underline />
            </CustomWrapper>
        );
    }
}
