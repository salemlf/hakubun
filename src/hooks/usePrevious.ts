import { useRef } from "react";

// cred to Nadia Makarevich, tutorial here: https://www.developerway.com/posts/implementing-advanced-use-previous-hook
export const usePrevious = <TValue>(value: TValue) => {
  const ref = useRef<{ value: TValue; prev: TValue | null }>({
    value: value,
    prev: null,
  });

  const current = ref.current.value;

  if (value !== current) {
    ref.current = {
      value: value,
      prev: current,
    };
  }

  return ref.current.prev;
};
