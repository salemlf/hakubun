import { IonIcon } from "@ionic/react";
import { Kanji, Subject } from "../../types/Subject";
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
  kanji: Kanji;
};

function KanjiMeaningMnemonic({ kanji }: Props) {
  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={MeaningIcon} />
        <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={kanji.meaning_mnemonic} />
      {kanji.meaning_hint && <Hint hint={kanji.meaning_hint} />}
      <UserNote subject={kanji as Subject} noteType="meaning" />
    </SubjDetailSection>
  );
}

export default KanjiMeaningMnemonic;
