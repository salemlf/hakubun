import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Hint } from "../subject-details/Hint";
import { Subject, Vocabulary } from "../../types/Subject";
import { UserNote } from "../subject-details/UserNote";

type Props = {
  vocab: Vocabulary;
};

export const VocabMeaningExplanation = ({ vocab }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Meaning Explanation</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={vocab.meaning_mnemonic} />
      {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
      <UserNote subject={vocab as Subject} noteType="meaning" />
    </SubjDetailSection>
  );
};
