import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import SortOrderOption from "../SortOrderOption";
import BackToBackOption from "../BackToBackOption";
import Label from "../Label";
import Switch from "../Switch";
import { SettingRow } from "../../styles/BaseStyledComponents";

function ReviewUserSettings() {
  const {
    reviewBatchSize,
    setReviewBatchSize,
    reviewSortOrderOption,
    setReviewSortOrderOption,
    reviewBackToBackOption,
    setReviewBackToBackOption,
    reviewNextItemOnCorrect,
    setReviewNextItemOnCorrect,
  } = useUserSettingsStoreFacade();

  return (
    <Card
      title="Reviews"
      headerBgColor="var(--wanikani-review)"
      headerTextColor="white"
    >
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
          setBackToBackChoice={setReviewBackToBackOption}
          headingFontSize="large"
          labelId="user-default-review-back-to-back-selector"
        />
      </SettingRow>
      <SettingRow>
        <Label
          labelText="Go to Next Item on Correct Answer"
          idOfControl="user-default-review-next-on-correct-switch"
        />
        <Switch
          isSwitchedOn={reviewNextItemOnCorrect}
          setIsSwitchedOn={setReviewNextItemOnCorrect}
          labelId="user-default-review-next-on-correct-switch"
          size="medium"
          showText={true}
        />
      </SettingRow>
    </Card>
  );
}

export default ReviewUserSettings;
