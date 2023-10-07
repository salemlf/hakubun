import { useState } from "react";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";
import AdvancedAssignmentFilters from "../AdvancedAssignmentFilters";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
  selectedAdvancedSubjIDs: string[];
  setSelectedAdvancedSubjIDs: React.Dispatch<React.SetStateAction<string[]>>;
  availableAssignmentTypes: AssignmentType[];
  availableAssignmentTypeNames: AssignmentTypeName[];
};

// TODO: make sure to deselect items if not in selectedAssignmentTypes
function AdvancedAssignmentSettings({
  assignmentData,
  selectedAdvancedSubjIDs,
  setSelectedAdvancedSubjIDs,
  showMeaning,
  availableAssignmentTypes,
  availableAssignmentTypeNames,
}: Props) {
  // TODO: filter based on selected types
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState(
    availableAssignmentTypes
  );

  return (
    <Card>
      <AdvancedAssignmentFilters
        availableAssignmentTypeNames={availableAssignmentTypeNames}
        selectedAssignmentTypes={selectedAssignmentTypes}
        setSelectedAssignmentTypes={setSelectedAssignmentTypes}
      />
      <AssignmentSelector
        selectedAdvancedSubjIDs={selectedAdvancedSubjIDs}
        setSelectedAdvancedSubjIDs={setSelectedAdvancedSubjIDs}
        showMeaning={showMeaning}
        assignmentData={assignmentData}
        assignmentFilters={selectedAssignmentTypes}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
