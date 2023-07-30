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
        assigmentsReadyToReview={availForReviewData}
      ></AssignmentSelector>
    </Card>
  );
}

export default AdvancedReviewSettings;
