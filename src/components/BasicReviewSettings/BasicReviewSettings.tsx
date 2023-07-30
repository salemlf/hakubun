import { Assignment, AssignmentType } from "../../types/Assignment";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";

type Props = {
  availForReviewData: Assignment[];
  defaultBatchSize: number;
  setBatchSize: React.Dispatch<React.SetStateAction<number>>;
  onSelectedAssignTypeChange: (assignmentTypeUpdated: AssignmentType) => void;
};

function BasicReviewSettings({
  availForReviewData,
  defaultBatchSize,
  setBatchSize,
  onSelectedAssignTypeChange,
}: Props) {
  return (
    <Card>
      <BatchSizeOption
        availForReview={availForReviewData}
        defaultSize={defaultBatchSize}
        onBatchSizeChange={(updatedBatchSize) => setBatchSize(updatedBatchSize)}
      />
      <AssignmentTypeSelector
        availForReviewData={availForReviewData as Assignment[]}
        onSelectedAssignTypeChange={onSelectedAssignTypeChange}
      />
    </Card>
  );
}

export default BasicReviewSettings;
