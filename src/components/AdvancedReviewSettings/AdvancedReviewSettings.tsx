import { Assignment } from "../../types/Assignment";
import Card from "../Card";
import AssignmentSelector from "../AssignmentSelector";

type Props = {
  availForReviewData: Assignment[];
};

function AdvancedReviewSettings({ availForReviewData }: Props) {
  return (
    <Card>
      <AssignmentSelector
        assignmentsReadyToReview={availForReviewData}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedReviewSettings;
