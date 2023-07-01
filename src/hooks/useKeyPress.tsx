import { useEffect } from "react";

export const useKeyPress = (callback: () => void, keyCodes: string[]) => {
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [callback]);

  const onKeyDown = (event: KeyboardEvent) => {
    const watchedKeyWasPressed = keyCodes.some((key) => event.key === key);
    if (watchedKeyWasPressed) {
      event.preventDefault();
      callback();
    }
  };
};
