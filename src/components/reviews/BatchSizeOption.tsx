import { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";

import { Assignment, assignmentBatchSizes } from "../../types/Assignment";

type BatchSizeOptionProps = {
  availForReview: Assignment[];
  defaultSize: number;
  onBatchSizeChange: (batchSize: number) => void;
};

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

  // TODO: add callback to pass batch size up

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
