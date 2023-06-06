import reactStringReplace from "react-string-replace";
import { SubjDetailTxt } from "./SubjectDetailsStyled";

import styled from "styled-components/macro";

const TaggedTxt = styled(SubjDetailTxt)`
  line-height: 1.75;
`;

const Tag = styled.span`
  color: white;
  padding: 4px;
  border-radius: 10px;
`;

const RadicalTag = styled(Tag)`
  background-color: var(--wanikani-radical);
`;

const KanjiTag = styled(Tag)`
  background-color: var(--wanikani-kanji);
`;

const ReadingTag = styled(Tag)`
  background-color: var(--wanikani-reading);
`;

// TODO: add rendering for vocabulary and meaning also
const createSubjectTags = (text: string) => {
  let radRegEx = new RegExp(`<radical>(.+?)<\/radical>`, "g");
  let kanjiRegEx = new RegExp(`<kanji>(.+?)<\/kanji>`, "g");
  let readingRegEx = new RegExp(`<reading>(.+?)<\/reading>`, "g");
  let japaneseRegEx = new RegExp(`<ja>(.+?)<\/ja>`, "g");

  let replaced = reactStringReplace(text, radRegEx, (match, i) => (
    <RadicalTag key={"radical" + i}>{match}</RadicalTag>
  ));

  replaced = reactStringReplace(replaced, kanjiRegEx, (match, i) => (
    <KanjiTag key={"kanji" + i}>{match}</KanjiTag>
  ));

  replaced = reactStringReplace(replaced, readingRegEx, (match, i) => (
    <ReadingTag key={"reading" + i}>{match}</ReadingTag>
  ));

  // TODO: replacing with nothing rn, use different font
  replaced = reactStringReplace(replaced, japaneseRegEx, (match, i) => (
    <Tag key={"js" + i}>{match}</Tag>
  ));

  return replaced;
};

type Props = {
  mnemonic: string;
};

// TODO: also render links in this component?
export const TxtWithSubjTags = ({ mnemonic }: Props) => {
  return <TaggedTxt>{createSubjectTags(mnemonic)}</TaggedTxt>;
};
