import { useState } from "react";
import { Assignment } from "../../types/Assignment";
import { useAssignmentSettingsCtxStore } from "../../stores/useAssignmentSettingsCtxStore/useAssignmentSettingsCtxStore";
import { AssignmentTypeName } from "../AssignmentTypeSelector/AssignmentTypeSelector.types";
import { SubjectType } from "../../types/Subject";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";
import AdvancedAssignmentFilters from "../AdvancedAssignmentFilters";
import { SettingOptionContainer } from "../../styles/BaseStyledComponents";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
  selectedAdvancedSubjIDs: string[];
  setSelectedAdvancedSubjIDs: React.Dispatch<React.SetStateAction<string[]>>;
  availableAssignmentTypes: SubjectType[];
  availableAssignmentTypeNames: AssignmentTypeName[];
  showBackToBackOption: boolean;
};

function AdvancedAssignmentSettings({
  assignmentData,
  selectedAdvancedSubjIDs,
  setSelectedAdvancedSubjIDs,
  showMeaning,
  availableAssignmentTypes,
  availableAssignmentTypeNames,
  showBackToBackOption,
}: Props) {
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState(
    availableAssignmentTypes
  );
  const lastUpdateChoice = useAssignmentSettingsCtxStore(
    (s) => s.lastUpdateChoice
  );
  const setLastUpdateChoice = useAssignmentSettingsCtxStore(
    (s) => s.setLastUpdateChoice
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
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
