import { Children, cloneElement, ReactElement } from "react";

// TODO: for x and y, modify to require at least one?
type ShiftByProps = {
  [key: string]: any;
  children: React.ReactNode;
  x?: number;
  y?: number;
};

// inspired by/adapted from Josh Comeau's ShiftBy component: https://www.joshwcomeau.com/snippets/react-components/shift-by/
// shifts element placement the number of specified pixels
export const ShiftBy = ({ x = 0, y = 0, children, ...props }: ShiftByProps) => {
  let combinedProps = {
    style: { transform: `translate(${x}px, ${y}px)` },
    ...props,
  };

  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement<any>, combinedProps);
      })}
    </>
  );
};
