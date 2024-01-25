import { useEffect, useState } from "react";
import { Mutate, StoreApi, UseBoundStore } from "zustand";
export type PersistentStore = UseBoundStore<
  Mutate<StoreApi<unknown>, [["zustand/persist", unknown]]>
>;

export const useHydration = (store: PersistentStore) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsubHydrate = store.persist.onHydrate(() => setHydrated(false));

    const unsubFinishHydration = store.persist.onFinishHydration(() =>
      setHydrated(true)
    );

    setHydrated(store.persist.hasHydrated());

    return () => {
      unsubHydrate();
      unsubFinishHydration();
    };
  }, [store.persist]);

  return hydrated;
};
