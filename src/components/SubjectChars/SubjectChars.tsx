import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectType, Subject } from "../../types/Subject";
import ImageFallback from "../ImageFallback/ImageFallback";
import styled from "styled-components/macro";

type CharDivProps = {
  withBgColor: boolean;
  subjType: SubjectType;
  fontSize: string;
  disableTextSelection: boolean;
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
  user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};
  -webkit-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};
  -moz-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};
  -ms-user-select: ${({ disableTextSelection }) =>
    disableTextSelection ? `none` : `text`};

  p {
    margin: 0;
    color: white;
    font-size: ${({ fontSize }) => fontSize};
    word-break: keep-all;
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
    margin: ${({ fontSize }) => `calc(${fontSize} * 0.33) 0`};
    filter: brightness(0) invert(1);
    width: ${({ fontSize }) => fontSize};
  }
`;

type Props = {
  subject: Subject;
  fontSize: string;
  withBgColor?: boolean;
  disableTextSelection?: boolean;
};

function SubjectChars({
  subject,
  fontSize,
  withBgColor = false,
  disableTextSelection = false,
}: Props) {
  let subjType = subject.object as SubjectType;

  return (
    <>
      {subject.useImage ? (
        <DivWithImage
          disableTextSelection={disableTextSelection}
          withBgColor={withBgColor}
          subjType={subjType}
          fontSize={fontSize}
        >
          <ImageFallback
            images={subject.availableImages}
            altText={subject.meaning_mnemonic}
          ></ImageFallback>
        </DivWithImage>
      ) : (
        <DivWithTxt
          disableTextSelection={disableTextSelection}
          withBgColor={withBgColor}
          subjType={subjType}
          fontSize={fontSize}
        >
          <p>{subject.characters}</p>
        </DivWithTxt>
      )}
    </>
  );
}

export default SubjectChars;
