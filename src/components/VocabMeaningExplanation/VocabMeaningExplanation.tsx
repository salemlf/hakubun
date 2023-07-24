import { IonIcon } from "@ionic/react";
import { Vocabulary, Subject } from "../../types/Subject";
import Hint from "../Hint";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import UserNote from "../UserNote";
import MeaningIcon from "../../images/meaning.svg";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  vocab: Vocabulary;
};

function VocabMeaningExplanation({ vocab }: Props) {
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
}

export default VocabMeaningExplanation;
