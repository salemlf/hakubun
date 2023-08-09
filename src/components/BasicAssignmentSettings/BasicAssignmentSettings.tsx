import { Assignment, AssignmentType } from "../../types/Assignment";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";

type Props = {
  assignmentData: Assignment[];
  defaultBatchSize: number;
  setBatchSize: React.Dispatch<React.SetStateAction<number>>;
  onSelectedAssignTypeChange: (assignmentTypeUpdated: AssignmentType) => void;
};

function BasicAssignmentSettings({
  assignmentData,
  defaultBatchSize,
  setBatchSize,
  onSelectedAssignTypeChange,
}: Props) {
  return (
    <Card>
      <BatchSizeOption
        assignmentData={assignmentData}
        defaultSize={defaultBatchSize}
        onBatchSizeChange={(updatedBatchSize) => setBatchSize(updatedBatchSize)}
      />
      <AssignmentTypeSelector
        assignmentData={assignmentData as Assignment[]}
        onSelectedAssignTypeChange={onSelectedAssignTypeChange}
      />
    </Card>
  );
}

export default BasicAssignmentSettings;
