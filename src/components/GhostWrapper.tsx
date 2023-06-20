import { Children, cloneElement } from "react";

type GhostWrapperProps = {
  [key: string]: any;
  children: React.ReactNode;
};

// adds passed in props to all the children it wraps
export const GhostWrapper = ({ children, ...props }: GhostWrapperProps) => {
  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child as React.ReactElement<any>, props);
      })}
    </>
  );
};
