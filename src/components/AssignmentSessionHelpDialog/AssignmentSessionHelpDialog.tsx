// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import { AssignmentSessionType } from "../../types/AssignmentQueueTypes";
import { DialogContent, DialogRoot, DialogTrigger } from "../Dialog";
import QuestionIcon from "../../images/question-mark.svg";
import styled from "styled-components";

const HelpButtonTrigger = styled(DialogTrigger)`
  padding: 10px;
`;

const Question = styled(IonIcon)`
  width: 2.25em;
  height: 2.25em;
`;

type Props = {
  sessionType: AssignmentSessionType;
};

function AssignmentSessionHelpDialog({ sessionType }: Props) {
  const title =
    sessionType === "lesson" ? "Lesson Quiz Help" : "Review Session Help";
  return (
    <DialogRoot>
      <HelpButtonTrigger>
        <Question src={QuestionIcon} />
      </HelpButtonTrigger>
      <DialogContent title={title} description="Testing 123">
        <p>Testing...</p>
      </DialogContent>
    </DialogRoot>
  );
}

export default AssignmentSessionHelpDialog;
