import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import SortOrderOption from "../SortOrderOption";
import Label from "../Label";
import Switch from "../Switch";
import { SettingRow } from "../../styles/BaseStyledComponents";

function LessonUserSettings() {
  const {
    lessonBatchSize,
    setLessonBatchSize,
    lessonSortOrderOption,
    setLessonSortOrderOption,
    lessonNextItemOnCorrect,
    setLessonNextItemOnCorrect,
  } = useUserSettingsStoreFacade();

  return (
    <Card
      title="Lessons"
      headerBgColor="var(--wanikani-lesson)"
      headerTextColor="white"
    >
      <SettingRow>
        <BatchSizeOption
          batchSize={lessonBatchSize}
          availableSizes={ASSIGNMENT_BATCH_SIZES}
          onBatchSizeChange={setLessonBatchSize}
          labelId="user-default-lesson-batch-size-selector"
        />
      </SettingRow>
      <SettingRow>
        <SortOrderOption
          sortOption={lessonSortOrderOption}
          setSortOption={setLessonSortOrderOption}
          labelId="user-default-lesson-sort-order-selector"
        />
      </SettingRow>
      <SettingRow>
        <Label
          labelText="Go to Next Item on Correct Answer"
          idOfControl="user-default-lesson-next-on-correct-switch"
        />
        <Switch
          isSwitchedOn={lessonNextItemOnCorrect}
          setIsSwitchedOn={setLessonNextItemOnCorrect}
          labelId="user-default-lesson-next-on-correct-switch"
          size="medium"
          showText={true}
        />
      </SettingRow>
    </Card>
  );
}

export default LessonUserSettings;
