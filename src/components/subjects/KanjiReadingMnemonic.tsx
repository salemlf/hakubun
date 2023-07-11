import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { Kanji } from "../../types/Subject";
import { Hint } from "../subject-details/Hint";

type Props = {
  kanji: Kanji;
};

export const KanjiReadingMnemonic = ({ kanji }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
      <TxtWithSubjTags textWithTags={kanji.reading_mnemonic!} />
      {kanji.reading_hint && <Hint hint={kanji.reading_hint} />}
    </SubjDetailSection>
  );
};
