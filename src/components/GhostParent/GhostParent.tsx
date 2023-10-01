import { Children, cloneElement, ReactElement, ReactNode } from "react";

type GhostParentProps = {
  [key: string]: any;
  children: ReactNode;
};

/**
 * Wraps child components with a ghost parent (adding no extra nodes), used to apply styles or other props to children
 * Considered calling this component "absent father" lol
 */
function GhostParent({ children, ...props }: GhostParentProps) {
  return (
    <>
      {Children.map(children, (child) => {
        return cloneElement(child as ReactElement<any>, props);
      })}
    </>
  );
}

export default GhostParent;
