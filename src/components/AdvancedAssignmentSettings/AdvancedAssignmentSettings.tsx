import { Assignment } from "../../types/Assignment";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";

type Props = {
  assignmentData: Assignment[];
  showMeaning: boolean;
};

// TODO: make more generic
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
