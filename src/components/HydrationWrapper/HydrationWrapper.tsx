import { PropsWithChildren } from "react";
import { PersistentStore, useHydration } from "../../hooks/useHydration";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";
import LoadingDots from "../LoadingDots";

interface Props extends PropsWithChildren {
  store: PersistentStore;
}

export const HydrationWrapper = ({ store, children }: Props) => {
  const isHydrated = useHydration(store);

  if (!isHydrated)
    return (
      <FixedCenterContainer>
        <LoadingDots />
      </FixedCenterContainer>
    );

  return <>{children}</>;
};

export default HydrationWrapper;
