import { Assignment } from "../../types/Assignment";
import SubjectWideBtnList from "../SubjectWideBtnList/SubjectWideBtnList";

type Props = {
  assigmentsReadyToReview: Assignment[];
};

function AssignmentSelector({ assigmentsReadyToReview }: Props) {
  console.log("assigmentsReadyToReview: ", assigmentsReadyToReview);
  return <div>Beep boop test</div>;
}

export default AssignmentSelector;
