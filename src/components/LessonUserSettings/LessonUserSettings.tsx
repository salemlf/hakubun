import { useUserSettingsStore } from "../../stores/useUserSettingsStore";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import SortOrderOption from "../SortOrderOption";
import { SettingRow } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SettingCategory = styled(Card)`
  display: flex;
`;

function LessonUserSettings() {
  const lessonBatchSize = useUserSettingsStore.use.lessonBatchSize();
  const setLessonBatchSize = useUserSettingsStore.use.setLessonBatchSize();
  const lessonSortOrderOption =
    useUserSettingsStore.use.lessonSortOrderOption();
  const setLessonSortOrderOption =
    useUserSettingsStore.use.setLessonSortOrderOption();

  return (
    <SettingCategory title="Lessons" headerBgColor="var(--wanikani-lesson)">
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
    </SettingCategory>
  );
}

export default LessonUserSettings;
