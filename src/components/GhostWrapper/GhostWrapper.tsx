import { Children, cloneElement, ReactElement, ReactNode } from "react";

type GhostWrapperProps = {
  [key: string]: any;
  children: ReactNode;
};

function GhostWrapper({ children, ...props }: GhostWrapperProps) {
  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement<any>, props);
      })}
    </>
  );
}

export default GhostWrapper;
