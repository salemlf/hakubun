import { useAssignmentSettingsCtxStore } from "../../stores/useAssignmentSettingsCtxStore/useAssignmentSettingsCtxStore";
import Selector, { SelectItem } from "../Selector";
import Label from "../Label";

type Props = {
  batchSize: string;
  availableSizes: string[];
  labelId?: string;
};

function BatchSizeOption({
  availableSizes,
  batchSize,
  labelId = "batch-size-selector",
}: Props) {
  const setBatchSize = useAssignmentSettingsCtxStore((s) => s.setBatchSize);

  return (
    <>
      <Label labelText="Batch Size" idOfControl={labelId} />
      <Selector
        id={labelId}
        value={batchSize.toString()}
        onValueChange={(updatedValue) => setBatchSize(updatedValue)}
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
