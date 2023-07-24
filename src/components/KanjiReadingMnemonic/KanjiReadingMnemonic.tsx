import { IonIcon } from "@ionic/react";
import { Kanji, Subject } from "../../types/Subject";
import Hint from "../Hint";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import UserNote from "../UserNote";
import ReadingIcon from "../../images/reading.svg";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  kanji: Kanji;
};

function KanjiReadingMnemonic({ kanji }: Props) {
  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={ReadingIcon} />
        <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={kanji.reading_mnemonic!} />
      {kanji.reading_hint && <Hint hint={kanji.reading_hint} />}
      <UserNote subject={kanji as Subject} noteType="reading" />
    </SubjDetailSection>
  );
}

export default KanjiReadingMnemonic;
