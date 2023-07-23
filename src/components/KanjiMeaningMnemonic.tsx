import { Kanji, Subject } from "../types/Subject";
import { Hint } from "./subject-details/Hint";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "./subject-details/SubjectDetailsStyled";
import { UserNote } from "./subject-details/UserNote";
import { TxtWithSubjTags } from "./TxtWithSubjTags";

type Props = {
  kanji: Kanji;
};

export const KanjiMeaningMnemonic = ({ kanji }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={kanji.meaning_mnemonic} />
      {kanji.meaning_hint && <Hint hint={kanji.meaning_hint} />}
      <UserNote subject={kanji as Subject} noteType="meaning" />
    </SubjDetailSection>
  );
};
