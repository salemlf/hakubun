import { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Assignment } from "../../types/Assignment";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";

type Props = {
  availForReview: Assignment[];
  defaultSize: number;
  onBatchSizeChange: (batchSize: number) => void;
};

function BatchSizeOption({
  availForReview,
  defaultSize,
  onBatchSizeChange,
}: Props) {
  const [batchSize, setBatchSize] = useState(defaultSize);
  let availBatchSizes = ASSIGNMENT_BATCH_SIZES.filter(
    (batchSize) => batchSize <= availForReview.length
  );

  const onBatchUpdate = (batchNum: number) => {
    setBatchSize(batchNum);
    onBatchSizeChange(batchNum);
  };

  return (
    <IonList>
      <IonItem>
        <IonSelect
          aria-label="batch-size"
          label="Batch Size"
          value={batchSize}
          onIonChange={(e) => onBatchUpdate(e.detail.value)}
        >
          {availBatchSizes.map((batchSize: number) => {
            return (
              <IonSelectOption key={`batch_${batchSize}`} value={batchSize}>
                {batchSize}
              </IonSelectOption>
            );
          })}
        </IonSelect>
      </IonItem>
    </IonList>
  );
}

export default BatchSizeOption;
