import reactStringReplace from "react-string-replace";
import { SubjDetailTxt } from "./subject-details/SubjectDetailsStyled";
import { getTagColor } from "../services/SubjectAndAssignmentService";
import { generateXNumUUIDs } from "../services/MiscService";
import { TagType } from "../types/MiscTypes";
import styled from "styled-components/macro";

type TagRegexes = {
  radRegEx: RegExp;
  kanjiRegEx: RegExp;
  vocabRegEx: RegExp;
  readingRegEx: RegExp;
  meaningRegEx: RegExp;
  japaneseRegEx: RegExp;
};

const TaggedTxt = styled(SubjDetailTxt)`
  line-height: 1.75;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
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

// TODO: improve so not so repetitive
const createSubjectTags = (text: string, uuidsArr: string[]) => {
  let radRegEx = new RegExp(`<radical>(.+?)<\/radical>`, "g");
  let kanjiRegEx = new RegExp(`<kanji>(.+?)<\/kanji>`, "g");
  let vocabRegEx = new RegExp(`<vocabulary>(.+?)<\/vocabulary>`, "g");
  let readingRegEx = new RegExp(`<reading>(.+?)<\/reading>`, "g");
  let meaningRegEx = new RegExp(`<meaning>(.+?)<\/meaning>`, "g");
  let japaneseRegEx = new RegExp(`<ja>(.+?)<\/ja>`, "g");

  let currUUIDArrIndex = 0;

  let replaced = reactStringReplace(text, radRegEx, (match, i) => {
    let uuid = uuidsArr[currUUIDArrIndex];
    currUUIDArrIndex++;

    return (
      <Tag key={`radical-tag${uuid}`} tagType="radical">
        {match}
      </Tag>
    );
  });

  replaced = reactStringReplace(replaced, kanjiRegEx, (match, i) => {
    let uuid = uuidsArr[currUUIDArrIndex];
    currUUIDArrIndex++;
    return (
      <Tag key={`kanji-tag${uuid}`} tagType="kanji">
        {match}
      </Tag>
    );
  });

  replaced = reactStringReplace(replaced, vocabRegEx, (match, i) => {
    let uuid = uuidsArr[currUUIDArrIndex];
    currUUIDArrIndex++;
    return (
      <Tag key={`vocabulary-tag${uuid}`} tagType="vocabulary">
        {match}
      </Tag>
    );
  });

  // TODO: replacing with nothing rn, use different font?
  replaced = reactStringReplace(replaced, japaneseRegEx, (match, i) => match);

  replaced = reactStringReplace(replaced, readingRegEx, (match, i) => {
    let uuid = uuidsArr[currUUIDArrIndex];
    currUUIDArrIndex++;

    return (
      <Tag key={`reading-tag${uuid}`} tagType="reading">
        {match}
      </Tag>
    );
  });

  replaced = reactStringReplace(replaced, meaningRegEx, (match, i) => {
    let uuid = uuidsArr[currUUIDArrIndex];
    currUUIDArrIndex++;

    return (
      <Tag key={`meaning-tag${uuid}`} tagType="meaning">
        {match}
      </Tag>
    );
  });

  return replaced;
};

// TODO: move generation of keys outside this component
const getKeyssForTags = (textWithTags: string, regexForTags: TagRegexes) => {
  let numUUIDsNeeded = 0;

  Object.entries(regexForTags).forEach(([key, regex]) => {
    let matches = ((textWithTags || "").match(regex) || []).length;
    numUUIDsNeeded += matches;
  });

  return generateXNumUUIDs(numUUIDsNeeded);
};

type Props = {
  textWithTags: string;
};

// TODO: also render links in this component?
export const TxtWithSubjTags = ({ textWithTags }: Props) => {
  const regexes = {
    radRegEx: new RegExp(`<radical>(.+?)<\/radical>`, "g"),
    kanjiRegEx: new RegExp(`<kanji>(.+?)<\/kanji>`, "g"),
    vocabRegEx: new RegExp(`<vocabulary>(.+?)<\/vocabulary>`, "g"),
    readingRegEx: new RegExp(`<reading>(.+?)<\/reading>`, "g"),
    meaningRegEx: new RegExp(`<meaning>(.+?)<\/meaning>`, "g"),
    japaneseRegEx: new RegExp(`<ja>(.+?)<\/ja>`, "g"),
  };

  let uuids = getKeyssForTags(textWithTags, regexes);

  return (
    <TaggedTxt>
      {uuids.length ? createSubjectTags(textWithTags, uuids) : textWithTags}
    </TaggedTxt>
  );
};
