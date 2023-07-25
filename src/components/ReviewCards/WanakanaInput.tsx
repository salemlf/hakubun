import { createElement } from "react";
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
  inputRef: React.MutableRefObject<HTMLInputElement>;
  // !added
};

function WanakanaInput({
  value,
  inputRef,
  onChange,
  translateToHiragana,
  ...props
}: Props) {
  const translatedVal = translateInputValue(value, translateToHiragana);

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
