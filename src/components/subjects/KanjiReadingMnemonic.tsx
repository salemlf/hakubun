import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Kanji, Subject } from "../../types/Subject";
import { Hint } from "../subject-details/Hint";
import UserNote from "../UserNote/UserNote";
import ReadingIcon from "../../images/reading.svg";
import { IconHeadingContainer } from "../styles/BaseStyledComponents";
import { IonIcon } from "@ionic/react";

type Props = {
  kanji: Kanji;
};

export const KanjiReadingMnemonic = ({ kanji }: Props) => {
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
};
