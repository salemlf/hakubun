import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
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
  const {
    reviewBatchSize,
    setReviewBatchSize,
    reviewSortOrderOption,
    setReviewSortOrderOption,
    reviewBackToBackOption,
    setReviewBackToBackOption,
  } = useUserSettingsStoreFacade();

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
          headingFontSize="large"
          labelId="user-default-review-back-to-back-selector"
        />
      </SettingRow>
    </SettingCategory>
  );
}

export default ReviewUserSettings;
