import { useState } from "react";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { AssignmentType } from "../../types/Assignment";
import Collapsible from "../Collapsible";
import styled from "styled-components";

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
};

// TODO: add "current level only" option
function AdvancedAssignmentFilters({
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Collapsible
      title="Filters and Sorting"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <AssignmentTypeSelector
        headingFontSize="small"
        availableAssignmentTypeNames={availableAssignmentTypeNames}
        selectedAssignmentTypes={selectedAssignmentTypes}
        setSelectedAssignmentTypes={setSelectedAssignmentTypes}
      />
    </Collapsible>
  );
}

export default AdvancedAssignmentFilters;
