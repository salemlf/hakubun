import Selector, { SelectItem } from "../Selector";
import Label from "../Label";

type Props = {
  batchSize: number;
  availableSizes: number[];
  onBatchSizeChange: (batchSize: number) => void;
  labelId?: string;
};

function BatchSizeOption({
  availableSizes,
  batchSize,
  onBatchSizeChange,
  labelId = "batch-size-selector",
}: Props) {
  const onBatchUpdate = (batchStr: string) => {
    let batchNum = parseInt(batchStr);
    onBatchSizeChange(batchNum);
  };

  return (
    <>
      <Label labelText="Batch Size" idOfControl={labelId} />
      <Selector
        id={labelId}
        value={batchSize.toString()}
        onValueChange={(updatedValue) => onBatchUpdate(updatedValue)}
      >
        {availableSizes.map((batchSize: number) => {
          return (
            <SelectItem key={`batch_${batchSize}`} value={batchSize.toString()}>
              {batchSize}
            </SelectItem>
          );
        })}
      </Selector>
    </>
  );
}

export default BatchSizeOption;
