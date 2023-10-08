import { BACK_TO_BACK_CHOICES } from "./BackToBackOption.constants";
import { BackToBackChoice } from "./BackToBackOption.types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";

type Props = {
  backToBackChoice: BackToBackChoice;
  onBackToBackChoiceChange: (choice: BackToBackChoice) => void;
  labelId?: string;
};

function BackToBackOption({
  backToBackChoice,
  onBackToBackChoiceChange,
  labelId = "back-to-back-option-selector",
}: Props) {
  return (
    <>
      <Label labelText="Batch Size" idOfControl={labelId} />
      <Selector
        id={labelId}
        value={backToBackChoice}
        onValueChange={(updatedValue) =>
          onBackToBackChoiceChange(updatedValue as BackToBackChoice)
        }
      >
        {BACK_TO_BACK_CHOICES.map((backToBackChoice: BackToBackChoice) => {
          return (
            <SelectItem
              key={`batch_${backToBackChoice}`}
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
