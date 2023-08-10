import { Assignment } from "../../types/Assignment";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
};

// TODO: move assignment selector into this file
function AdvancedAssignmentSettings({ assignmentData, showMeaning }: Props) {
  return (
    <Card>
      <AssignmentSelector
        showMeaning={showMeaning}
        assignmentData={assignmentData}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedAssignmentSettings;
