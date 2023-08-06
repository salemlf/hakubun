import { getSubjectDisplayName } from "../../services/SubjectAndAssignmentService";
import { Subject } from "../../types/Subject";
import SubjectChars from "../SubjectChars/SubjectChars";
// import styled from "styled-components/macro";
import styled from "styled-components";

const SubjectName = styled.h1`
  margin: 0;
  word-break: break-word;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

type Props = {
  subject: Subject;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord for SubjectName
function SubjNameAndCharacter({ subject }: Props) {
  // TODO: display loading skeletons
  return (
    <>
      <SubjectChars subject={subject} fontSize="2rem" withBgColor={true} />
      {subject && <SubjectName>{getSubjectDisplayName(subject)}</SubjectName>}
    </>
  );
}

export default SubjNameAndCharacter;
