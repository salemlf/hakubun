import { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";

import { Assignment, assignmentBatchSizes } from "../../types/Assignment";

type BatchSizeOptionProps = {
  availForReview: Assignment[];
};

export const BatchSizeOption = ({ availForReview }: BatchSizeOptionProps) => {
  // TODO: change to use user setting for default batch size once settings are implemented
  const [batchSize, setBatchSize] = useState(5);
  let availBatchSizes = assignmentBatchSizes.filter(
    (batchSize) => batchSize <= availForReview.length
  );

  return (
    <IonList>
      <IonItem>
        <IonSelect
          aria-label="batch-size"
          label="Batch Size"
          value={batchSize}
          onIonChange={(e) => setBatchSize(e.detail.value)}
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
