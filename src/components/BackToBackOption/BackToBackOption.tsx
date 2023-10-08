import { getSettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.service";
import { BACK_TO_BACK_CHOICES } from "./BackToBackOption.constants";
import { BackToBackChoice } from "./BackToBackOption.types";
import { SettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";

type Props = {
  backToBackChoice: BackToBackChoice;
  onBackToBackChoiceChange: (choice: BackToBackChoice) => void;
  headingFontSize: SettingHeadingFontSize;
  labelId?: string;
};

function BackToBackOption({
  backToBackChoice,
  onBackToBackChoiceChange,
  headingFontSize,
  labelId = "back-to-back-option-selector",
}: Props) {
  let headingSize = getSettingHeadingFontSize(headingFontSize);

  const updateBackToBackChoice = (updatedValue: string) => {
    onBackToBackChoiceChange(updatedValue as BackToBackChoice);
  };

  return (
    <>
      <Label
        labelText="Back to Back"
        idOfControl={labelId}
        labelfontSize={headingSize}
      />
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
