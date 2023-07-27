import { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Assignment } from "../../types/Assignment";
import styled from "styled-components/macro";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";

const SelectContainer = styled.div`
  display: flex;
`;

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
  // const [batchSize, setBatchSize] = useState(defaultSize);
  let [batchSize, setBatchSize] = useState<React.Key>(defaultSize);
  let availBatchSizes = ASSIGNMENT_BATCH_SIZES.filter(
    (batchSize) => batchSize <= availForReview.length
  );

  let batchSizesWithIDs = availBatchSizes.map((value) => ({
    id: value,
    value,
  }));

  const onBatchUpdate = (batchNum: number) => {
    console.log(
      "🚀 ~ file: BatchSizeOption.tsx:45 ~ onBatchUpdate ~ batchNum:",
      batchNum
    );
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
