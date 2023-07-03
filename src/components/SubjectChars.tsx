import ImageFallback from "./ImageFallback";
import { Subject, SubjectType } from "../types/Subject";

import styled from "styled-components/macro";
import { getSubjectColor } from "../services/SubjectAndAssignmentService";

type CharDivProps = {
  withBgColor: boolean;
  subjType: SubjectType;
  fontSize: string;
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
  word-break: break-all;
`;

const DivWithTxt = styled(CharDiv)`
  p {
    margin: 0;
    color: white;
    font-size: ${({ fontSize }) => fontSize};
  }
`;

const DivWithImage = styled(CharDiv)`
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
};

export const SubjectChars = ({
  subject,
  fontSize,
  withBgColor = false,
}: Props) => {
  let subjType = subject.object as SubjectType;

  return (
    <>
      {subject.useImage ? (
        <DivWithImage
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
          withBgColor={withBgColor}
          subjType={subjType}
          fontSize={fontSize}
        >
          <p>{subject.characters}</p>
        </DivWithTxt>
      )}
    </>
  );
};
