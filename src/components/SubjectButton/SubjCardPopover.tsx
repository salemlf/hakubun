import { IonItem } from "@ionic/react";
import { getTimeFromNow } from "../../services/MiscService";
import { Subject, SubjectType } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";
import SubjectChars from "../SubjectChars/SubjectChars";
// import styled from "styled-components/macro";
import styled from "styled-components";

type Props = {
  subject: Subject;
  assignment: Assignment | undefined;
  navigate: (page: string) => void;
};

type PopoverProps = {
  subjType: SubjectType;
};

const PopoverContainer = styled(IonItem)<PopoverProps>`
  width: 100%;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  flex-direction: column;
  --inner-border-width: 0;

  background-color: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};
  --background: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};
`;

const SubjectTimeTill = styled.p`
  margin: 0;
  font-size: 1.25rem;
`;

const TxtContainer = styled.div`
  width: 100%;
  text-align: center;
`;

// TODO: change to use custom popover component
function SubjCardPopover({ subject, assignment, navigate }: Props) {
  let timeTill;
  if (assignment) {
    let availTime = assignment.available_at;
    timeTill = getTimeFromNow(availTime);
  } else {
    // TODO: display locked icon instead
    timeTill = "Locked";
  }

  return (
    <PopoverContainer
      subjType={subject.object}
      button
      detail={false}
      onClick={() => navigate(`/subjects/${subject.id}`)}
    >
      <TxtContainer>
        <SubjectChars subject={subject} fontSize="4rem" />
        <SubjectTimeTill>{timeTill}</SubjectTimeTill>
      </TxtContainer>
    </PopoverContainer>
  );
}

export default SubjCardPopover;
