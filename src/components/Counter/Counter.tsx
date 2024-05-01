import { useEffect } from "react";
import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import styled from "styled-components";

const fontSize = 30;
const padding = 15;
const height = fontSize + padding;

type CounterContainerProps = {
  fontsize: number;
};

// TODO: specify font-size in ch?
const CounterContainer = styled.div<CounterContainerProps>`
  display: flex;
  overflow: hidden;
  font-size: ${({ fontsize }) => fontsize};
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0;
  border-radius: 0.25rem;
  line-height: 1;
  color: black;
  background-color: #ffffff;
  height: 2.5ch;
`;

type Props = {
  value: number;
  maxNum: number;
};

// based off of animated counter from build UI (https://buildui.com/recipes/animated-counter)
function Counter({ value, maxNum }: Props) {
  const show10s = maxNum >= 10;
  const show100s = maxNum >= 100;

  return (
    <CounterContainer fontsize={fontSize}>
      {show100s && <Digit place={100} value={value} />}
      {show10s && <Digit place={10} value={value} />}
      <Digit place={1} value={value} />
    </CounterContainer>
  );
}

type DigitContainerProps = {
  containerheight: number;
};

const DigitContainer = styled.div<DigitContainerProps>`
  position: relative;
  font-variant-numeric: tabular-nums;
  width: 1ch;
  height: 2.5ch;
`;

type DigitProps = {
  place: number;
  value: number;
};

function Digit({ place, value }: DigitProps) {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <DigitContainer containerheight={height}>
      {[...Array(10).keys()].map((i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </DigitContainer>
  );
}

const NumberStyled = styled(motion.span)`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
`;

type NumberProps = {
  mv: MotionValue;
  number: number;
};

function Number({ mv, number }: NumberProps) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return <NumberStyled style={{ y }}>{number}</NumberStyled>;
}
export default Counter;
