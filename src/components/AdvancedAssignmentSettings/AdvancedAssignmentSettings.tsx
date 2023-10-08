import { useState } from "react";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
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
}: Props) {
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState(
    availableAssignmentTypes
  );

  return (
    <Card>
      <SettingOptionContainer>
        <AdvancedAssignmentFilters
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
        assignmentFilters={selectedAssignmentTypes}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
