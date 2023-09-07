import { useUserSettingsStore } from "../../stores/useUserSettingsStore";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Card from "../Card";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";
import { SettingRow } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SettingCategory = styled(Card)`
  display: flex;
`;

function LessonUserSettings() {
  const lessonBatchSize = useUserSettingsStore.use.lessonBatchSize();
  const setLessonBatchSize = useUserSettingsStore.use.setLessonBatchSize();

  const onBatchUpdate = (batchStr: string) => {
    let batchNum = parseInt(batchStr);
    setLessonBatchSize(batchNum);
  };

  return (
    <SettingCategory title="Lessons" headerBgColor="var(--wanikani-lesson)">
      <SettingRow>
        <Label
          labelText="Default Batch Size"
          idOfControl="user-default-lesson-batch-size-selector"
        />
        <Selector
          id="user-default-lesson-batch-size-selector"
          value={lessonBatchSize.toString()}
          onValueChange={(updatedValue) => onBatchUpdate(updatedValue)}
        >
          {ASSIGNMENT_BATCH_SIZES.map((batch: number) => {
            return (
              <SelectItem key={`batch_${batch}`} value={batch.toString()}>
                {batch}
              </SelectItem>
            );
          })}
        </Selector>
      </SettingRow>
    </SettingCategory>
  );
}

export default LessonUserSettings;
