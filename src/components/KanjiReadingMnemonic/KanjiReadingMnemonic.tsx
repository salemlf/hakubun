import { Kanji, Subject } from "../../types/Subject";
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
  kanji: Kanji;
};

function KanjiReadingMnemonic({ kanji }: Props) {
  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <SvgIcon icon={<ReadingIcon />} width="1.5em" height="1.5em" />
        <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
      </IconHeadingContainer>
      <TxtWithSubjTags textWithTags={kanji.reading_mnemonic!} />
      {kanji.reading_hint && <Hint hint={kanji.reading_hint} />}
      <UserNote subject={kanji as Subject} noteType="reading" />
    </SubjDetailSection>
  );
}

export default KanjiReadingMnemonic;
