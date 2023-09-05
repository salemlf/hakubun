import { useState } from "react";
import { Assignment } from "../../types/Assignment";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";
import Selector, { SelectItem } from "../Selector";
import Label from "../Label";
import styled from "styled-components";

const BatchSizeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 16px 16px;
  align-items: center;
`;

type Props = {
  assignmentData: Assignment[];
  defaultSize: number;
  onBatchSizeChange: (batchSize: number) => void;
};

function BatchSizeOption({
  assignmentData,
  defaultSize,
  onBatchSizeChange,
}: Props) {
  // TODO: move batchSize/setBatchSize state up a component
  let [batchSize, setBatchSize] = useState<number>(defaultSize);
  let availBatchSizes = ASSIGNMENT_BATCH_SIZES.filter(
    (batchSize) => batchSize <= assignmentData.length
  );

  const onBatchUpdate = (batchStr: string) => {
    let batchNum = parseInt(batchStr);
    setBatchSize(batchNum);
    onBatchSizeChange(batchNum);
  };

  return (
    <BatchSizeContainer>
      <Label labelText="Batch Size" idOfControl="batch-size-selector" />
      <Selector
        id="batch-size-selector"
        value={batchSize.toString()}
        onValueChange={(updatedValue) => onBatchUpdate(updatedValue)}
      >
        {availBatchSizes.map((batchSize: number) => {
          return (
            <SelectItem key={`batch_${batchSize}`} value={batchSize.toString()}>
              {batchSize}
            </SelectItem>
          );
        })}
      </Selector>
    </BatchSizeContainer>
  );
}

export default BatchSizeOption;
