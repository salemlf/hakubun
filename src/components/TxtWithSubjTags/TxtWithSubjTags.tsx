import { Fragment } from "react";
import reactStringReplace from "react-string-replace";
import { getTagColor } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { generateXNumUUIDs } from "../../utils";
import { TAG_REGEXES } from "./constants";
import { TagType } from "../../types/MiscTypes";
import styled from "styled-components";

type TagRegexes = {
  radRegEx: RegExp;
  kanjiRegEx: RegExp;
  vocabRegEx: RegExp;
  readingRegEx: RegExp;
  meaningRegEx: RegExp;
  japaneseRegEx: RegExp;
  kanjiJapaneseRegEx: RegExp;
  japaneseReadingRegEx: RegExp;
  readingJapaneseRegEx: RegExp;
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

const JapaneseTxt = styled.span`
  font-family: var(--japanese-font-family);
`;

type TaggedTxtProps = {
  txtsize: string;
};

const TaggedTxt = styled.p<TaggedTxtProps>`
  font-size: ${({ txtsize }) => txtsize};
  color: var(--text-color);
  line-height: 2;
  margin: 5px 0;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

const JapaneseTag = styled(Tag)`
  font-family: var(--japanese-font-family);
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
        <Tag tagType="radical" aria-label="Radical Subject">
          {match}
        </Tag>
        <Goo />
      </Fragment>
    );
  });

  replaced = reactStringReplace(
    replaced,
    regexForTags.kanjiJapaneseRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;
      return (
        <Fragment key={`kanji-ja-tag${uuid}`}>
          <JapaneseTag tagType="kanji" aria-label="Kanji Subject">
            {match}
          </JapaneseTag>
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.kanjiRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;
      return (
        <Fragment key={`kanji-tag${uuid}`}>
          <Tag tagType="kanji" aria-label="Kanji Subject">
            {match}
          </Tag>
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

      const found = regexForTags.japaneseRegEx.exec(match);
      let leftover = found ? match.replace(regexForTags.japaneseRegEx, "") : "";

      return (
        <Fragment key={`vocabulary-tag${uuid}`}>
          {found ? (
            <>
              <JapaneseTag tagType="vocabulary" aria-label="Vocabulary Subject">
                {found[found.length - 1]}
              </JapaneseTag>
              <JapaneseTxt>{leftover}</JapaneseTxt>
            </>
          ) : (
            <Tag tagType="vocabulary" aria-label="Vocabulary Subject">
              {match}
            </Tag>
          )}
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.readingJapaneseRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;

      return (
        <Fragment key={`reading-ja-tag${uuid}`}>
          <JapaneseTag tagType="reading" aria-label="Subject Reading">
            {match}
          </JapaneseTag>
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.japaneseRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;

      const found = regexForTags.readingRegEx.exec(match);
      let leftover = found ? match.replace(regexForTags.readingRegEx, "") : "";

      return (
        <Fragment key={`japanese-tag${uuid}`}>
          {found ? (
            <>
              <Tag tagType="reading" aria-label="Subject Reading">
                {found[found.length - 1]}
              </Tag>
              <JapaneseTxt>{leftover}</JapaneseTxt>
            </>
          ) : (
            <JapaneseTxt aria-label="Subject Reading">{match}</JapaneseTxt>
          )}
          <Goo />
        </Fragment>
      );
    }
  );

  replaced = reactStringReplace(
    replaced,
    regexForTags.readingRegEx,
    (match, i) => {
      let uuid = uuidsArr[currUUIDArrIndex];
      currUUIDArrIndex++;

      return (
        <Fragment key={`reading-tag${uuid}`}>
          <Tag tagType="reading" aria-label="Subject Reading">
            {match}
          </Tag>
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
          <Tag tagType="meaning" aria-label="Subject Meaning">
            {match}
          </Tag>
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
  txtSize?: string;
};

function TxtWithSubjTags({ textWithTags, txtSize = "1rem" }: Props) {
  let uuids = getKeysForTags(textWithTags, TAG_REGEXES);

  return (
    <TaggedTxt txtsize={txtSize}>
      {uuids.length
        ? createSubjectTags(textWithTags, TAG_REGEXES, uuids)
        : textWithTags}
    </TaggedTxt>
  );
}

export default TxtWithSubjTags;
