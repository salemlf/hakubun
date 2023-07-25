import { createElement, useEffect, useRef } from "react";
import { toHiragana } from "wanakana";

const translateInputValue = (string: string, translateToHiragana: boolean) => {
  if (translateToHiragana) {
    return toHiragana(string, { IMEMode: true });
  }
  return string;
};

type Props = {
  [key: string]: any;
  value: string;
  onChange: (e: any) => void;
  translateToHiragana: boolean;
};

function WanakanaInput({
  value,
  onChange,
  translateToHiragana,
  ...props
}: Props) {
  const inputRef = useRef(document.createElement("input"));
  const translatedVal = translateInputValue(value, translateToHiragana);
  // TODO: change this, a mehhh workaround for autofocusing
  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);
  });

  const handleChange = (e: any) => {
    let updatedValue = translateInputValue(e.target.value, translateToHiragana);
    inputRef.current.value = updatedValue;
    onChange(e);
  };

  return createElement("input", {
    ref: inputRef,
    value: translatedVal,
    onChange: handleChange,
    autoCorrect: "off",
    autoCapitalize: "none",
    ...props,
  });
}

export default WanakanaInput;
