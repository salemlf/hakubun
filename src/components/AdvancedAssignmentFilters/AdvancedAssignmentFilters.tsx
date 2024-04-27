import { useState } from "react";
import AssignmentTypeSelector from "../AssignmentTypeSelector";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
import { SubjectType } from "../../types/Subject";
import Collapsible from "../Collapsible";
import BackToBackOption from "../BackToBackOption";
import CurrentLevelOnlyOption from "../CurrentLevelOnlyOption";
import styled from "styled-components";
import LastUpdateOption from "../LastUpdateOption/LastUpdateOption";
import { LastUpdateChoice } from "../LastUpdateOption/LastUpdateOption.types";

const FilterSettingContainer = styled.div`
  display: flex;
  margin-bottom: 12px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

type Props = {
  availableAssignmentTypeNames: AssignmentTypeName[];
  selectedAssignmentTypes: SubjectType[];
  setSelectedAssignmentTypes: (assignmentTypesSelected: SubjectType[]) => void;
  showBackToBackOption: boolean;
  backToBackChoice: BackToBackChoice;
  setBackToBackChoice: (choice: BackToBackChoice) => void;
  lastUpdateChoice: LastUpdateChoice;
  setLastUpdateChoice: (choice: LastUpdateChoice) => void;
  filterByCurrentLevel: boolean;
  setFilterByCurrentLevel: (isFilteringByCurrLvl: boolean) => void;
};

function AdvancedAssignmentFilters({
  availableAssignmentTypeNames,
  selectedAssignmentTypes,
  setSelectedAssignmentTypes,
  showBackToBackOption,
  backToBackChoice,
  setBackToBackChoice,
  lastUpdateChoice,
  setLastUpdateChoice,
  filterByCurrentLevel,
  setFilterByCurrentLevel,
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
      <FilterSettingContainer>
        <LastUpdateOption
          lastUpdateChoice={lastUpdateChoice}
          onLastUpdateChoiceChange={setLastUpdateChoice}
          headingFontSize="small"
        />
      </FilterSettingContainer>
      <FilterSettingContainer>
        <CurrentLevelOnlyOption
          isSwitchedOn={filterByCurrentLevel}
          setIsSwitchedOn={setFilterByCurrentLevel}
          headingFontSize="small"
        />
      </FilterSettingContainer>
    </Collapsible>
  );
}

export default AdvancedAssignmentFilters;
