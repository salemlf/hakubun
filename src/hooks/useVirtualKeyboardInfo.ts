import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";

export const useVirtualKeyboardInfo = () => {
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!Capacitor.isPluginAvailable("Keyboard")) return;

    Keyboard.addListener("keyboardDidShow", (info) => {
      setIsKeyboardVisible(true);
      setKeyboardHeight(info.keyboardHeight);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
};
