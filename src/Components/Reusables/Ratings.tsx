import * as React from 'react';
import { Star } from 'react-feather';

import styled from 'src/lib/styled-component';

const Wrapper = styled.div`
  display: flex;
`;

interface IProps {
  max: number;
  rating: number;
}

export class Ratings extends React.Component<IProps> {
  public render() {
    const { rating, max } = this.props;
    return (
      <Wrapper {...this.props}>
        <Star color={(rating / max) * 5 >= 1 ? 'orange' : 'gray'} />
        <Star color={(rating / max) * 5 >= 2 ? 'orange' : 'gray'} />
        <Star color={(rating / max) * 5 >= 3 ? 'orange' : 'gray'} />
        <Star color={(rating / max) * 5 >= 4 ? 'orange' : 'gray'} />
        <Star color={(rating / max) * 5 === 5 ? 'orange' : 'gray'} />
      </Wrapper>
    );
  }
}
