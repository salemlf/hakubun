import { useState } from "react";
import {
  Button,
  Item,
  Label,
  ListBox,
  Popover,
  Select,
  SelectValue,
  Text,
} from "react-aria-components";
import type { ItemProps, SelectProps } from "react-aria-components";
// import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { Assignment } from "../../types/Assignment";
import styled from "styled-components/macro";
import { ASSIGNMENT_BATCH_SIZES } from "../../constants";

const SelectContainer = styled.div`
  display: flex;
`;

const SelectLabel = styled(Label)`
  font-size: 1.25rem;
  margin-bottom: 5px;
`;

const SelectBox = styled(Select)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SelectBtn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  min-width: 15ch;
  max-width: 30ch;
  border: 1px solid var(--select-border);
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  font-size: 1rem;
  cursor: pointer;
  line-height: 1.1;
  background-color: #fff;
  color: black;
`;

const BatchList = styled(ListBox)`
  --highlight-background: slateblue;
  --highlight-foreground: white;
  --text-color: black;
  --text-color-disabled: darkgrey;

  max-height: inherit;
  box-sizing: border-box;
  overflow: auto;
  padding: 2px;
  outline: none;

  .react-aria-Section:not(:first-child) {
    margin-top: 12px;
  }

  .react-aria-Header {
    font-size: 1.143rem;
    font-weight: bold;
    padding: 0 0.571rem 0 1.571rem;
  }

  .react-aria-Popover {
    --background-color: white;
    --border-color: black;

    border: 1px solid var(--border-color);
    min-width: 20px;
    max-width: 250px;
    box-sizing: border-box;
    box-shadow: 0 8px 20px rgba(0 0 0 / 0.1);
    border-radius: 6px;
    background: var(--background-color);
    outline: none;
  }
`;

const BatchOption = styled(Item)`
  --highlight-background: slateblue;
  --highlight-foreground: white;
  --text-color: black;
  --text-color-disabled: darkgrey;

  background-color: white;
  color: black;
  margin: 2px;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  outline: none;
  cursor: default;
  color: var(--text-color);
  font-size: 1.072rem;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  &[aria-selected="true"] {
    font-weight: 600;

    &::before {
      content: "✓";
      content: "✓" / "";
      alt: " ";
      position: absolute;
      top: 4px;
      left: 4px;
    }
  }

  &[data-focused],
  &[data-pressed] {
    background: var(--highlight-background);
    color: var(--highlight-foreground);
  }

  &[aria-disabled] {
    color: var(--text-color-disabled);
  }

  [slot="label"] {
    font-weight: bold;
  }

  [slot="description"] {
    font-size: small;
  }
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
    // <IonList>
    //   <IonItem>
    //     <IonSelect
    //       aria-label="batch-size"
    //       label="Batch Size"
    //       value={batchSize}
    //       onIonChange={(e) => onBatchUpdate(e.detail.value)}
    //     >
    // {availBatchSizes.map((batchSize: number) => {
    //   return (
    //     <IonSelectOption key={`batch_${batchSize}`} value={batchSize}>
    //       {batchSize}
    //     </IonSelectOption>
    //   );
    // })}
    //     </IonSelect>
    //   </IonItem>
    // </IonList>
    <SelectContainer>
      <SelectBox
        items={batchSizesWithIDs}
        selectedKey={batchSize}
        onSelectionChange={(selected) => onBatchUpdate(selected as number)}
      >
        <SelectLabel>Batch Size</SelectLabel>
        <SelectBtn>
          <SelectValue />
          <span aria-hidden="true">▼</span>
        </SelectBtn>
        <Popover>
          <BatchList>
            {availBatchSizes.map((batchSize: number) => {
              return (
                <BatchOption
                  key={`batch_${batchSize}`}
                  textValue={`${batchSize}`}
                >
                  {batchSize}
                </BatchOption>
              );
            })}
          </BatchList>
        </Popover>
      </SelectBox>
    </SelectContainer>
  );
}

export default BatchSizeOption;
