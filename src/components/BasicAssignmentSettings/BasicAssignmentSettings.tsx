import { getSubjectTypeDisplayText } from "../../services/SubjectAndAssignmentService";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentSortOption } from "../SortOrderOption/types";
import Card from "../Card";
import BatchSizeOption from "../BatchSizeOption";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import SortOrderOption from "../SortOrderOption";

// TODO: change so this isn't using so many props
type Props = {
  assignmentData: Assignment[];
  defaultBatchSize: number;
  setBatchSize: (size: number) => void;
  availableAssignmentTypes: AssignmentType[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
  sortOption: AssignmentSortOption;
  setSortOption: (sortOption: AssignmentSortOption) => void;
};

function BasicAssignmentSettings({
  assignmentData,
  defaultBatchSize,
  setBatchSize,
  availableAssignmentTypes,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  sortOption,
  setSortOption,
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
      <SortOrderOption sortOption={sortOption} onSortUpdate={setSortOption} />
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
