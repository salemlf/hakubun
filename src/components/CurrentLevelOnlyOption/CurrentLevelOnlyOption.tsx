import Switch from "../Switch";
import Label from "../Label";
import { getSettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.service";
import { SettingHeadingFontSize } from "../AssignmentSettings/AssignmentSettings.types";

type Props = {
  isSwitchedOn: boolean;
  setIsSwitchedOn: (isSwitchedOn: boolean) => void;
  headingFontSize: SettingHeadingFontSize;
  labelId?: string;
};

function CurrentLevelOnlyOption({
  isSwitchedOn,
  setIsSwitchedOn,
  headingFontSize,
  labelId = "current-level-only-switch",
}: Props) {
  let headingSize = getSettingHeadingFontSize(headingFontSize);

  return (
    <>
      <Label
        labelText="Current Level Only"
        idOfControl={labelId}
        labelfontSize={headingSize}
      />
      <Switch
        isSwitchedOn={isSwitchedOn}
        setIsSwitchedOn={setIsSwitchedOn}
        labelId={labelId}
        size="small"
      />
    </>
  );
}

export default CurrentLevelOnlyOption;
