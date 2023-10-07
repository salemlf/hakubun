import { useState } from "react";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { AssignmentType } from "../../types/Assignment";
import Collapsible from "../Collapsible";
import styled from "styled-components";

// const AdvancedFiltersHeading = styled.h2`
//   font-size: 1.25rem;
//   color: white;
//   padding-left: 12px;
//   margin-top: 10px;
// `;

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
};

// TODO: add a "select all/deselect all" button
// TODO: make collapsible
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
      {/* <AdvancedFiltersHeading>Filters and Sorting</AdvancedFiltersHeading> */}
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
