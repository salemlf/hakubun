import { Kanji, Subject } from "../../types/Subject";
import Hint from "../Hint";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import UserNote from "../UserNote";
import SvgIcon from "../SvgIcon";
import MeaningIcon from "../../images/meaning.svg?react";
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
        <SvgIcon icon={<MeaningIcon />} width="1.5em" height="1.5em" />
        <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={kanji.meaning_mnemonic} />
      {kanji.meaning_hint && <Hint hint={kanji.meaning_hint} />}
      <UserNote subject={kanji as Subject} noteType="meaning" />
    </SubjDetailSection>
  );
}

export default KanjiMeaningMnemonic;
