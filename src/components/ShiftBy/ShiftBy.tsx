import { Children, cloneElement, ReactElement, ReactNode } from "react";
import { RequireAtLeastOne } from "../../types/Global";

type ShiftByPropsOptional = {
  [key: string]: any;
  children: ReactNode;
  x?: number;
  y?: number;
};

export type ShiftByProps = RequireAtLeastOne<ShiftByPropsOptional, "x" | "y">;

function ShiftBy({ x = 0, y = 0, children, ...props }: ShiftByProps) {
  let styleAndSubstance = {
    style: { transform: `translate(${x}px, ${y}px)` },
    ...props,
  };

  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement<any>, styleAndSubstance);
      })}
    </>
  );
}

export default ShiftBy;
