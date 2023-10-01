import { Assignment, AssignmentType } from "../../types/Assignment";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import { getSubjectTypeDisplayText } from "../../services/SubjectAndAssignmentService";

type Props = {
  assignmentData: Assignment[];
  defaultBatchSize: number;
  setBatchSize: (size: number) => void;
  availableAssignmentTypes: AssignmentType[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
};

function BasicAssignmentSettings({
  assignmentData,
  defaultBatchSize,
  setBatchSize,
  availableAssignmentTypes,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
}: Props) {
  const availableAssignmentTypeNames = availableAssignmentTypes.map(
    (assignmentType) => {
      return {
        name: assignmentType,
        displayName: getSubjectTypeDisplayText(
          assignmentType,
          assignmentType === "radical"
        ),
      };
    }
  );

  return (
    <Card>
      <BatchSizeOption
        assignmentData={assignmentData}
        defaultSize={defaultBatchSize}
        onBatchSizeChange={(updatedBatchSize) => setBatchSize(updatedBatchSize)}
      />
      <AssignmentTypeSelector
        selectedAssignmentTypes={selectedAssignmentTypes}
        availableAssignmentTypeNames={availableAssignmentTypeNames}
        setSelectedAssignmentTypes={setSelectedAssignmentTypes}
      />
    </Card>
  );
}

export default BasicAssignmentSettings;
