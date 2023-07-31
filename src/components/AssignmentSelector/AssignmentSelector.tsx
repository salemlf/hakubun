import { Assignment } from "../../types/Assignment";
import SubjectWideBtnList from "../SubjectWideBtnList/SubjectWideBtnList";

type Props = {
  assignmentsReadyToReview: Assignment[];
};

function AssignmentSelector({ assignmentsReadyToReview }: Props) {
  // console.log("assignmentsReadyToReview: ", assignmentsReadyToReview);
  return <div>Beep boop test</div>;
}

export default AssignmentSelector;
