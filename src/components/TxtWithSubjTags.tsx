import { Fragment } from "react";
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
  japaneseReadingRegEx: RegExp;
};

type TagProps = {
  tagType: TagType;
};

const Tag = styled.span<TagProps>`
  color: white;
  padding: 4px 6px;
  background: ${({ tagType }) => getTagColor(tagType)};
  filter: url("#goo");
  display: inline;
  box-decoration-break: clone;
`;

const TaggedTxt = styled(SubjDetailTxt)`
  line-height: 1.75;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

// this is used so there's no icky wrapping for words where color is cut off/no border-radius on one side
// see this codepen for reference: https://codepen.io/ines/pen/NXbmRO
const Goo = () => {
  return (
    <svg
      style={{ visibility: "hidden", position: "absolute" }}
      width="0"
      height="0"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

// TODO: improve so not so repetitive
const createSubjectTags = (
  text: string,
  regexForTags: TagRegexes,
  uuidsArr: string[]
) => {
  let currUUIDArrIndex = 0;

  let replaced = reactStringReplace(text, regexForTags.radRegEx, (match, i) => {
    let uuid = uuidsArr[currUUIDArrIndex];
    currUUIDArrIndex++;

    return (
      <Fragment key={`radical-tag${uuid}`}>
        <Tag tagType="radical">{match}</Tag>
        <Goo />
      </Fragment>
    );
  });

  replaced = reactStringReplace(
    replaced,
    regexForTags.kanjiRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;
      return (
        <Fragment key={`kanji-tag${uuid}`}>
          <Tag tagType="kanji">{match}</Tag>
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.vocabRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;
      return (
        <Fragment key={`vocabulary-tag${uuid}`}>
          <Tag tagType="vocabulary">{match}</Tag>
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.japaneseReadingRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;

      return (
        <Fragment key={`ja-reading-tag${uuid}`}>
          <Tag tagType="reading">{match}</Tag>
          <Goo />
        </Fragment>
      );
    }
  );

  // TODO: replacing with nothing rn, use different font?
  replaced = reactStringReplace(
    replaced,
    regexForTags.japaneseRegEx,
    (match, i) => match
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.readingRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;

      return (
        <Fragment key={`reading-tag${uuid}`}>
          <Tag tagType="reading">{match}</Tag>
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.meaningRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;

      return (
        <Fragment key={`meaning-tag${uuid}`}>
          <Tag tagType="meaning">{match}</Tag>
          <Goo />
        </Fragment>
      );
    }
  );

  return replaced;
};

// TODO: move generation of keys outside this component
const getKeysForTags = (textWithTags: string, regexForTags: TagRegexes) => {
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
  const tagRegexes = {
    radRegEx: new RegExp(`<radical>(.+?)<\/radical>`, "g"),
    kanjiRegEx: new RegExp(`<kanji>(.+?)<\/kanji>`, "g"),
    vocabRegEx: new RegExp(`<vocabulary>(.+?)<\/vocabulary>`, "g"),
    readingRegEx: new RegExp(`<reading>(.+?)<\/reading>`, "g"),
    meaningRegEx: new RegExp(`<meaning>(.+?)<\/meaning>`, "g"),
    japaneseRegEx: new RegExp(`<ja>(.+?)<\/ja>`, "g"),
    japaneseReadingRegEx: new RegExp(
      `<reading><ja>(.+?)<\/ja><\/reading>`,
      "g"
    ),
  };

  let uuids = getKeysForTags(textWithTags, tagRegexes);

  return (
    <TaggedTxt>
      {uuids.length
        ? createSubjectTags(textWithTags, tagRegexes, uuids)
        : textWithTags}
    </TaggedTxt>
  );
};
