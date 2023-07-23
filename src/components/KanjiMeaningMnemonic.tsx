import { IonIcon } from "@ionic/react";
import { Kanji, Subject } from "../types/Subject";
import { Hint } from "./subject-details/Hint";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "./subject-details/SubjectDetailsStyled";
import { UserNote } from "./subject-details/UserNote";
import { TxtWithSubjTags } from "./TxtWithSubjTags";
import MeaningIcon from "../images/meaning.svg";
import { IconHeadingContainer } from "./styles/BaseStyledComponents";

type Props = {
  kanji: Kanji;
};

export const KanjiMeaningMnemonic = ({ kanji }: Props) => {
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
};
