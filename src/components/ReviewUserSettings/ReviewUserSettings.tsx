import { useUserSettingsStore } from "../../stores/useUserSettingsStore";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import SortOrderOption from "../SortOrderOption";
import { SettingRow } from "../../styles/BaseStyledComponents";
import styled from "styled-components";
import BackToBackOption from "../BackToBackOption";

const SettingCategory = styled(Card)`
  display: flex;
`;

function ReviewUserSettings() {
  const reviewBatchSize = useUserSettingsStore.use.reviewBatchSize();
  const setReviewBatchSize = useUserSettingsStore.use.setReviewBatchSize();
  const reviewSortOrderOption =
    useUserSettingsStore.use.reviewSortOrderOption();
  const setReviewSortOrderOption =
    useUserSettingsStore.use.setReviewSortOrderOption();
  const reviewBackToBackOption =
    useUserSettingsStore.use.reviewBackToBackOption();
  const setReviewBackToBackOption =
    useUserSettingsStore.use.setReviewBackToBackOption();

  return (
    <SettingCategory title="Reviews" headerBgColor="var(--wanikani-review)">
      <SettingRow>
        <BatchSizeOption
          batchSize={reviewBatchSize}
          availableSizes={ASSIGNMENT_BATCH_SIZES}
          onBatchSizeChange={setReviewBatchSize}
          labelId="user-default-review-batch-size-selector"
        />
      </SettingRow>
      <SettingRow>
        <SortOrderOption
          sortOption={reviewSortOrderOption}
          setSortOption={setReviewSortOrderOption}
          labelId="user-default-review-sort-order-selector"
        />
      </SettingRow>
      <SettingRow>
        <BackToBackOption
          backToBackChoice={reviewBackToBackOption}
          onBackToBackChoiceChange={setReviewBackToBackOption}
          labelId="user-default-review-back-to-back-selector"
        />
      </SettingRow>
    </SettingCategory>
  );
}

export default ReviewUserSettings;
