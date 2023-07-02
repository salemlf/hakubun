import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Hint } from "../subject-details/Hint";
import { Vocabulary } from "../../types/Subject";

type Props = {
  vocab: Vocabulary;
};

export const VocabReadingExplanation = ({ vocab }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Reading Explanation</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={vocab.reading_mnemonic!} />
      {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
    </SubjDetailSection>
  );
};
