import { SubjInfoContainer } from "./SubjectDetailsStyled";
import { Subject } from "../types/Subject";
import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../hooks/useAssignmentsBySubjIDs";

type Props = {
  subject: Subject;
};

export const KanjiSubjDetails = ({ subject }: Props) => {
  const {
    isLoading: radicalsUsedSubjLoading,
    data: radicalsUsedSubjData,
    error: radicalsUsedSubjErr,
  } = useSubjectsByIDs(subject.amalgamation_subject_ids);

  const {
    isLoading: radicalsUsedAssignmentsLoading,
    data: radicalsUsedAssignmentsData,
    error: radicalsUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(subject.amalgamation_subject_ids);

  return (
    <SubjInfoContainer>
      <div>
        <h3>Radical Combination</h3>
        <p>...</p>
      </div>
      <div>
        <h3>Meaning Mnemonic</h3>
        <p>...</p>
      </div>
    </SubjInfoContainer>
  );
};
