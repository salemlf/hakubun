import { useState } from "react";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
import { AssignmentSessionType } from "../../types/AssignmentQueueTypes";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";
import AdvancedAssignmentFilters from "../AdvancedAssignmentFilters";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
  selectedAdvancedSubjIDs: string[];
  setSelectedAdvancedSubjIDs: React.Dispatch<React.SetStateAction<string[]>>;
  availableAssignmentTypes: AssignmentType[];
  availableAssignmentTypeNames: AssignmentTypeName[];
  showBackToBackOption: boolean;
  backToBackChoice: BackToBackChoice;
  setBackToBackChoice: (choice: BackToBackChoice) => void;
  settingsType: AssignmentSessionType;
};

function AdvancedAssignmentSettings({
  assignmentData,
  selectedAdvancedSubjIDs,
  setSelectedAdvancedSubjIDs,
  showMeaning,
  availableAssignmentTypes,
  availableAssignmentTypeNames,
  showBackToBackOption,
  backToBackChoice,
  setBackToBackChoice,
  settingsType,
}: Props) {
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState(
    availableAssignmentTypes
  );

  const [filterByCurrentLevel, setFilterByCurrentLevel] =
    useState<boolean>(false);

  return (
    <Card>
      <SettingOptionContainer>
        <AdvancedAssignmentFilters
          filterByCurrentLevel={filterByCurrentLevel}
          setFilterByCurrentLevel={setFilterByCurrentLevel}
          availableAssignmentTypeNames={availableAssignmentTypeNames}
          selectedAssignmentTypes={selectedAssignmentTypes}
          setSelectedAssignmentTypes={setSelectedAssignmentTypes}
          showBackToBackOption={showBackToBackOption}
          backToBackChoice={backToBackChoice}
          setBackToBackChoice={setBackToBackChoice}
        />
      </SettingOptionContainer>
      <AssignmentSelector
        selectedAdvancedSubjIDs={selectedAdvancedSubjIDs}
        setSelectedAdvancedSubjIDs={setSelectedAdvancedSubjIDs}
        showMeaning={showMeaning}
        assignmentData={assignmentData}
        filterByCurrentLevel={filterByCurrentLevel}
        assignmentTypeFilter={selectedAssignmentTypes}
        settingsType={settingsType}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
