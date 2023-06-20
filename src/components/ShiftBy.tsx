import React, { Children, cloneElement } from "react";
import type {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  ReactElement,
  ReactText,
} from "react";
import styled from "styled-components";

interface Props extends ComponentPropsWithoutRef<any> {
  //   children: React.ReactNode;
  children: ReactElement<any>;
  x?: number;
  y?: number;
}

type ReactChild = ReactElement<any>;

type GhostDivProps = {
  x: number;
  y: number;
};

const GhostDiv = styled.div<GhostDivProps>`
  display: relative;

  & > * {
    display: absolute;
  }

  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
`;

// TODO: finish implementing
// adapted from Josh Comeau's ShiftBy component: https://www.joshwcomeau.com/snippets/react-components/shift-by/
// shifts element placement the number of specified pixels
export const ShiftBy = ({ x = 0, y = 0, children, ...delegated }: Props) => {
  const childrenShifted = React.cloneElement(
    delegated.children as React.ReactElement<any>,
    {
      style: { transform: `translate(${x}px, ${y}px)` },
    }
  );

  return (
    // <GhostDiv x={x} y={y} {...delegated}>
    <>
      {childrenShifted}
      {Children.map(children, (child) => {
        const item = child as ReactElement<PropsWithChildren<any>>;
        const style = { transform: `translate(${x}px, ${y}px)` };

        return cloneElement(item, { style });
      })}
    </>
    // </GhostDiv>
  );
};
