import { useState } from "react";
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Assignment } from "../../types/Assignment";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import styled from "styled-components/macro";

const Select = styled(IonSelect)`
  font-size: 1.25rem;
  min-height: 48px;
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
  // TODO: move batchSize/setBatchSize state up a component
  let [batchSize, setBatchSize] = useState<React.Key>(defaultSize);
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
        <Select
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
        </Select>
      </IonItem>
    </IonList>
  );
}

export default BatchSizeOption;
