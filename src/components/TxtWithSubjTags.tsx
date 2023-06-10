import reactStringReplace from "react-string-replace";
import { SubjDetailTxt } from "./subject-details/SubjectDetailsStyled";

import styled from "styled-components/macro";
import { getTagColor } from "../services/SubjectAndAssignmentService";
import { TagType } from "../types/MiscTypes";

const TaggedTxt = styled(SubjDetailTxt)`
  line-height: 1.75;
`;

type TagProps = {
  tagType: TagType;
};

const Tag = styled.span<TagProps>`
  color: white;
  padding: 4px;
  border-radius: 10px;
  background-color: ${({ tagType }) => getTagColor(tagType)};
`;

// TODO: add rendering for meaning also
const createSubjectTags = (text: string) => {
  let radRegEx = new RegExp(`<radical>(.+?)<\/radical>`, "g");
  let kanjiRegEx = new RegExp(`<kanji>(.+?)<\/kanji>`, "g");
  let vocabRegEx = new RegExp(`<vocabulary>(.+?)<\/vocabulary>`, "g");
  let readingRegEx = new RegExp(`<reading>(.+?)<\/reading>`, "g");
  let japaneseRegEx = new RegExp(`<ja>(.+?)<\/ja>`, "g");

  let replaced = reactStringReplace(text, radRegEx, (match, i) => (
    <Tag key={"radical" + i} tagType="radical">
      {match}
    </Tag>
  ));

  replaced = reactStringReplace(replaced, kanjiRegEx, (match, i) => (
    <Tag key={"kanji" + i} tagType="kanji">
      {match}
    </Tag>
  ));

  replaced = reactStringReplace(replaced, vocabRegEx, (match, i) => (
    <Tag key={"vocabulary" + i} tagType="vocabulary">
      {match}
    </Tag>
  ));

  // TODO: replacing with nothing rn, use different font?
  replaced = reactStringReplace(replaced, japaneseRegEx, (match, i) => match);

  replaced = reactStringReplace(replaced, readingRegEx, (match, i) => (
    <Tag key={"reading" + i} tagType="reading">
      {match}
    </Tag>
  ));

  return replaced;
};

type Props = {
  textWithTags: string;
};

// TODO: also render links in this component?
export const TxtWithSubjTags = ({ textWithTags }: Props) => {
  return <TaggedTxt>{createSubjectTags(textWithTags)}</TaggedTxt>;
};
