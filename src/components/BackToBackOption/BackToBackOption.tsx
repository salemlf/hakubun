import { BACK_TO_BACK_CHOICES } from "./BackToBackOption.constants";
import { BackToBackChoice } from "./BackToBackOption.types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";

type Props = {
  backToBackChoice: BackToBackChoice;
  onBackToBackChoiceChange: (choice: BackToBackChoice) => void;
  labelId?: string;
};

// TODO: add this to user settings page
function BackToBackOption({
  backToBackChoice,
  onBackToBackChoiceChange,
  labelId = "back-to-back-option-selector",
}: Props) {
  const updateBackToBackChoice = (updatedValue: string) => {
    onBackToBackChoiceChange(updatedValue as BackToBackChoice);
  };

  return (
    <>
      <Label labelText="Batch to Back" idOfControl={labelId} />
      <Selector
        id={labelId}
        value={backToBackChoice.toString()}
        onValueChange={(updatedValue) => updateBackToBackChoice(updatedValue)}
      >
        {BACK_TO_BACK_CHOICES.map((backToBackChoice: BackToBackChoice) => {
          return (
            <SelectItem
              key={`back_to_back_${backToBackChoice}`}
              value={backToBackChoice}
            >
              {backToBackChoice}
            </SelectItem>
          );
        })}
      </Selector>
    </>
  );
}

export default BackToBackOption;
