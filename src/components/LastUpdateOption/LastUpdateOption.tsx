import { getSettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.service";
import { LAST_UPDATE_CHOICES } from "./LastUpdateOption.constants";
import { LastUpdateChoice } from "./LastUpdateOption.types";
import { SettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.types";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";

type Props = {
  lastUpdateChoice: LastUpdateChoice;
  onLastUpdateChoiceChange: (selectedLastUpdate: LastUpdateChoice) => void;
  headingFontSize: SettingHeadingFontSize;
  labelId?: string;
};

function LastUpdateOption({
  lastUpdateChoice,
  onLastUpdateChoiceChange,
  headingFontSize,
  labelId = "last-update-option-selector",
}: Props) {
  const headingSize = getSettingHeadingFontSize(headingFontSize);

  const updateLastUpdateChoice = (lastUpdatedVal: string) => {
    const lastUpdatedHrs = parseInt(lastUpdatedVal);

    const selectedLastUpdate =
      LAST_UPDATE_CHOICES.find(
        (lastUpdateChoice: LastUpdateChoice) =>
          lastUpdateChoice.value === lastUpdatedHrs
      ) ?? LAST_UPDATE_CHOICES[0];
    onLastUpdateChoiceChange(selectedLastUpdate);
  };

  return (
    <>
      <Label
        labelText="Last Update Within"
        idOfControl={labelId}
        labelfontSize={headingSize}
      />
      <Selector
        id={labelId}
        value={lastUpdateChoice.value.toString()}
        onValueChange={(updatedValue) => updateLastUpdateChoice(updatedValue)}
      >
        {LAST_UPDATE_CHOICES.map((lastUpdateChoice: LastUpdateChoice) => {
          return (
            <SelectItem
              key={`last_update_${lastUpdateChoice.value}`}
              value={lastUpdateChoice.value.toString()}
            >
              {lastUpdateChoice.displayOption}
            </SelectItem>
          );
        })}
      </Selector>
    </>
  );
}

export default LastUpdateOption;
