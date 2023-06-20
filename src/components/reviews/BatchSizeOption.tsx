import { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";

import { Assignment, assignmentBatchSizes } from "../../types/Assignment";

type BatchSizeOptionProps = {
  availForReview: Assignment[];
  defaultSize: number;
  onBatchSizeChange: (batchSize: number) => void;
};

// TODO: add an "all" option so can review all items at once if wanted
// TODO: increase label font-size
export const BatchSizeOption = ({
  availForReview,
  defaultSize,
  onBatchSizeChange,
}: BatchSizeOptionProps) => {
  const [batchSize, setBatchSize] = useState(defaultSize);
  let availBatchSizes = assignmentBatchSizes.filter(
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
};
