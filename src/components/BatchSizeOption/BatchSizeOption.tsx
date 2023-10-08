import Selector, { SelectItem } from "../Selector";
import Label from "../Label";

type Props = {
  batchSize: string;
  availableSizes: string[];
  onBatchSizeChange: (batchSize: string) => void;
  labelId?: string;
};

function BatchSizeOption({
  availableSizes,
  batchSize,
  onBatchSizeChange,
  labelId = "batch-size-selector",
}: Props) {
  return (
    <>
      <Label labelText="Batch Size" idOfControl={labelId} />
      <Selector
        id={labelId}
        value={batchSize.toString()}
        onValueChange={(updatedValue) => onBatchSizeChange(updatedValue)}
      >
        {availableSizes.map((batchSize: string) => {
          return (
            <SelectItem key={`batch_${batchSize}`} value={batchSize}>
              {batchSize}
            </SelectItem>
          );
        })}
      </Selector>
    </>
  );
}

export default BatchSizeOption;
