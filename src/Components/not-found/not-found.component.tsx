import * as React from 'react';
import styled from 'src/lib/styled-component';

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
`;

const Wrapper = styled.div`
  justify-content: center;
  margin: 35vh 0;
`;

export const NotFound = () => (
  <Wrapper>
    <Title>404</Title>
    <Content>
      <Subtitle>This page could not be found.</Subtitle>
    </Content>
  </Wrapper>
);
