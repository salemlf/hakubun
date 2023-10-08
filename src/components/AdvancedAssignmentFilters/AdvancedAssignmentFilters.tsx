import { useState } from "react";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
import { AssignmentType } from "../../types/Assignment";
import Collapsible from "../Collapsible";
import BackToBackOption from "../BackToBackOption";
import styled from "styled-components";

const FilterSettingContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
  justify-content: space-between;
  padding: 0 10px;
`;

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: AssignmentType[];
  setSelectedAssignmentTypes: (
    assignmentTypesSelected: AssignmentType[]
  ) => void;
  showBackToBackOption: boolean;
  backToBackChoice: BackToBackChoice;
  setBackToBackChoice: (choice: BackToBackChoice) => void;
};

// TODO: add "current level only" option
function AdvancedAssignmentFilters({
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  showBackToBackOption,
  backToBackChoice,
  setBackToBackChoice,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Collapsible title="Filters" isOpen={isOpen} setIsOpen={setIsOpen}>
      <FilterSettingContainer>
        <AssignmentTypeSelector
          headingFontSize="small"
          availableAssignmentTypeNames={availableAssignmentTypeNames}
          selectedAssignmentTypes={selectedAssignmentTypes}
          setSelectedAssignmentTypes={setSelectedAssignmentTypes}
        />
      </FilterSettingContainer>
      {showBackToBackOption && (
        <FilterSettingContainer>
          <BackToBackOption
            backToBackChoice={backToBackChoice}
            onBackToBackChoiceChange={setBackToBackChoice}
            headingFontSize="small"
          />
        </FilterSettingContainer>
      )}
    </Collapsible>
  );
}

export default AdvancedAssignmentFilters;
