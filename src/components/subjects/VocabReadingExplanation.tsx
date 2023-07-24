import { IonIcon } from "@ionic/react";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import Hint from "../Hint/Hint";
import { Subject, Vocabulary } from "../../types/Subject";
import UserNote from "../UserNote/UserNote";
import ReadingIcon from "../../images/reading.svg";
import { IconHeadingContainer } from "../styles/BaseStyledComponents";

type Props = {
  vocab: Vocabulary;
};

export const VocabReadingExplanation = ({ vocab }: Props) => {
  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={ReadingIcon} />
        <SubjDetailSubHeading>Reading Explanation</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={vocab.reading_mnemonic!} />
      {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
      <UserNote subject={vocab as Subject} noteType="reading" />
    </SubjDetailSection>
  );
};
