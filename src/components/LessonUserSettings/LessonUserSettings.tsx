import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import SortOrderOption from "../SortOrderOption";
import { SettingRow } from "../../styles/BaseStyledComponents";

function LessonUserSettings() {
  const {
    lessonBatchSize,
    setLessonBatchSize,
    lessonSortOrderOption,
    setLessonSortOrderOption,
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
    </Card>
  );
}

export default LessonUserSettings;
