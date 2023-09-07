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

function ReviewUserSettings() {
  const reviewBatchSize = useUserSettingsStore.use.reviewBatchSize();
  const setReviewBatchSize = useUserSettingsStore.use.setReviewBatchSize();

  const onBatchUpdate = (batchStr: string) => {
    let batchNum = parseInt(batchStr);
    setReviewBatchSize(batchNum);
  };

  return (
    <SettingCategory title="Reviews" headerBgColor="var(--wanikani-review)">
      <SettingRow>
        <Label
          labelText="Default Batch Size"
          idOfControl="user-default-review-batch-size-selector"
        />
        <Selector
          id="user-default-review-batch-size-selector"
          value={reviewBatchSize.toString()}
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

export default ReviewUserSettings;
