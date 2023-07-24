import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import Hint from "../Hint/Hint";
import { Subject, Vocabulary } from "../../types/Subject";
import UserNote from "../UserNote/UserNote";
import { IconHeadingContainer } from "../styles/BaseStyledComponents";
import MeaningIcon from "../../images/meaning.svg";
import { IonIcon } from "@ionic/react";

type Props = {
  vocab: Vocabulary;
};

export const VocabMeaningExplanation = ({ vocab }: Props) => {
  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={MeaningIcon} />
        <SubjDetailSubHeading>Meaning Explanation</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={vocab.meaning_mnemonic} />
      {vocab.meaning_hint && <Hint hint={vocab.meaning_hint} />}
      <UserNote subject={vocab as Subject} noteType="meaning" />
    </SubjDetailSection>
  );
};
