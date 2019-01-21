import * as React from 'react';
import styled from 'styled-components';

const CustomButton = styled.button`
  padding: 10px 20px;
  outline: none;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  color: #3d3d3d;
  font-size: 16px;
  transition: background-color 200ms ease-in-out;

  &:hover,
  &:focus {
    background-color: #b88a45;
  }
`;

interface IProps {
  type?: string;
  children: any;
  onClick?: () => void;
}

export const Button = (props: IProps) => (
  <CustomButton onClick={props.onClick} type={props.type}>
    {props.children}
  </CustomButton>
);
