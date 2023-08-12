import { Assignment } from "../../types/Assignment";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
  selectedAdvancedSubjIDs: string[];
  setSelectedAdvancedSubjIDs: React.Dispatch<React.SetStateAction<string[]>>;
};

// TODO: move assignment selector into this file?
function AdvancedAssignmentSettings({
  assignmentData,
  selectedAdvancedSubjIDs,
  setSelectedAdvancedSubjIDs,
  showMeaning,
}: Props) {
  return (
    <Card>
      <AssignmentSelector
        selectedAdvancedSubjIDs={selectedAdvancedSubjIDs}
        setSelectedAdvancedSubjIDs={setSelectedAdvancedSubjIDs}
        showMeaning={showMeaning}
        assignmentData={assignmentData}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
