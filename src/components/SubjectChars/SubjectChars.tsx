import { getSubjectColor } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { SubjectType, Subject } from "../../types/Subject";
import ImageFallback from "../ImageFallback/ImageFallback";
import styled from "styled-components";

type CharDivProps = {
  withBgColor: boolean;
  subjType: SubjectType;
  fontSize: string;
  disableTextSelection: boolean;
  alignText: "left" | "center";
};

const CharDiv = styled.div<CharDivProps>`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ withBgColor }) =>
    withBgColor ? ({ subjType }) => getSubjectColor(subjType) : `unset`};
  padding: ${({ withBgColor }) => (withBgColor ? `0 8px` : `0`)};
  text-align: center;
`;

const DivWithTxt = styled(CharDiv)<CharDivProps>`
  display: inline-block;
  overflow-wrap: break-word;

  user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};
  -webkit-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};
  -moz-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};
  -ms-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};

  p {
    font-family: var(--japanese-font-family);
    margin: 0;
    color: white;
    font-size: ${({ fontSize }) => fontSize};
    text-align: ${({ alignText }) => alignText};
  }
`;

const DivWithImage = styled(CharDiv)<CharDivProps>`
  user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `auto`};
  -webkit-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `auto`};
  -moz-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `auto`};
  -ms-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `auto`};

  background-color: ${({ withBgColor }) =>
    withBgColor ? ({ subjType }) => getSubjectColor(subjType) : `unset`};

  img {
    margin: 0.45em 0;
    filter: brightness(0) invert(1);
    width: ${({ fontSize }) => fontSize};
    /* unsetting max-width from 100% otherwise hides image completely */
    max-width: unset;
  }
`;

type Props = {
  subject: Subject;
  fontSize: string;
  withBgColor?: boolean;
  disableTextSelection?: boolean;
  alignText?: "left" | "center";
};

function SubjectChars({
  subject,
  fontSize,
  alignText = "left",
  withBgColor = false,
  disableTextSelection = false,
}: Props) {
  let subjType = subject.object as SubjectType;

  return (
    <>
      {subject.useImage ? (
        <DivWithImage
          alignText={alignText}
          disableTextSelection={disableTextSelection}
          withBgColor={withBgColor}
          subjType={subjType}
          fontSize={fontSize}
        >
          <ImageFallback
            data-testid="subj-char"
            images={subject.availableImages}
            altText={subject.meaning_mnemonic}
          ></ImageFallback>
        </DivWithImage>
      ) : (
        <DivWithTxt
          alignText={alignText}
          disableTextSelection={disableTextSelection}
          withBgColor={withBgColor}
          subjType={subjType}
          fontSize={fontSize}
        >
          <p data-testid="subj-char">{subject.characters}</p>
        </DivWithTxt>
      )}
    </>
  );
}

export default SubjectChars;
