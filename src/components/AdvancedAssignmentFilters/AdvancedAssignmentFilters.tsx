import AssignmentTypeSelector from "../AssignmentTypeSelector";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { AssignmentType } from "../../types/Assignment";
import styled from "styled-components";

const AdvancedFiltersHeading = styled.h2`
  font-size: 1.25rem;
  color: white;
  /* padding-top: 0; */
  padding-left: 12px;
  margin-top: 10px;
`;

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
};

// TODO: add a "select all/deselect all" button
function AdvancedAssignmentFilters({
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
}: Props) {
  return (
    <>
      <AdvancedFiltersHeading>Filters and Sorting</AdvancedFiltersHeading>
      <AssignmentTypeSelector
        headingFontSize="small"
        availableAssignmentTypeNames={availableAssignmentTypeNames}
        selectedAssignmentTypes={selectedAssignmentTypes}
        setSelectedAssignmentTypes={setSelectedAssignmentTypes}
      />
    </>
  );
}

export default AdvancedAssignmentFilters;
