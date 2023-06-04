import { SubjInfoContainer } from "./SubjectDetailsStyled";
import { Subject } from "../types/Subject";
import {
  SubjDetailSubHeading,
  SubjDetailTxt,
  SubjDetailSection,
} from "./SubjectDetailsStyled";

import { useSubjectsByIDs } from "../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../hooks/useAssignmentsBySubjIDs";
import { TxtWithSubjTags } from "./TxtWithSubjTags";

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
      <SubjDetailSection>
        <SubjDetailSubHeading>Radical Combination</SubjDetailSubHeading>
        <SubjDetailTxt>...</SubjDetailTxt>
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags mnemonic={subject.meaning_mnemonic} />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags mnemonic={subject.reading_mnemonic!} />
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
