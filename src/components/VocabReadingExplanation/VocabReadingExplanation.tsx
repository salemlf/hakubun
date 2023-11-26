import { Subject, Vocabulary } from "../../types/Subject";
import Hint from "../Hint";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import UserNote from "../UserNote";
import SvgIcon from "../SvgIcon";
import ReadingIcon from "../../images/reading.svg?react";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  vocab: Vocabulary;
};

function VocabReadingExplanation({ vocab }: Props) {
  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <SvgIcon icon={<ReadingIcon />} width="1.5em" height="1.5em" />
        <SubjDetailSubHeading>Reading Explanation</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={vocab.reading_mnemonic!} />
      {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
      <UserNote subject={vocab as Subject} noteType="reading" />
    </SubjDetailSection>
  );
}

export default VocabReadingExplanation;
