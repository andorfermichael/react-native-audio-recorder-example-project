// @flow
import React from 'react';
import styled from 'styled-components';
import { Svg, Line } from 'react-native-svg';

const STROKE_WIDTH = 4;

const StyledDummyWaveLine = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`;

type Props = {
  width: number,
  height: number
};

export default class DummyWaveLine extends React.PureComponent<Props> {
  render() {
    const { width, height } = this.props;
    const verticalCenter = height / 2;

    return (
      <StyledDummyWaveLine width={width} height={height}>
        <Svg width={width} height={height}>
          <Line
            x1={0}
            y1={verticalCenter}
            x2={width}
            y2={verticalCenter}
            stroke={'#7cdbd5'}
            strokeWidth={STROKE_WIDTH}
          />
        </Svg>
      </StyledDummyWaveLine>
    );
  }
}
