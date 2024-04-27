import { useState } from "react";
import { Assignment } from "../../types/Assignment";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
import { AssignmentSessionType } from "../../types/AssignmentQueueTypes";
import { SubjectType } from "../../types/Subject";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";
import AdvancedAssignmentFilters from "../AdvancedAssignmentFilters";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";
import { LastUpdateChoice } from "../LastUpdateOption/LastUpdateOption.types";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
  selectedAdvancedSubjIDs: string[];
  setSelectedAdvancedSubjIDs: React.Dispatch<React.SetStateAction<string[]>>;
  availableAssignmentTypes: SubjectType[];
  availableAssignmentTypeNames: AssignmentTypeName[];
  showBackToBackOption: boolean;
  backToBackChoice: BackToBackChoice;
  setBackToBackChoice: (choice: BackToBackChoice) => void;
  lastUpdateChoice: LastUpdateChoice;
  setLastUpdateChoice: (choice: LastUpdateChoice) => void;
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
  lastUpdateChoice,
  setLastUpdateChoice,
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
          lastUpdateChoice={lastUpdateChoice}
          setLastUpdateChoice={setLastUpdateChoice}
        />
      </SettingOptionContainer>
      <AssignmentSelector
        selectedAdvancedSubjIDs={selectedAdvancedSubjIDs}
        setSelectedAdvancedSubjIDs={setSelectedAdvancedSubjIDs}
        showMeaning={showMeaning}
        assignmentData={assignmentData}
        filterByCurrentLevel={filterByCurrentLevel}
        filterByLastUpdate={lastUpdateChoice}
        assignmentTypeFilter={selectedAssignmentTypes}
        settingsType={settingsType}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
