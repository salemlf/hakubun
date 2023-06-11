import ImageFallback from "./ImageFallback";
import { Subject, SubjectType } from "../types/Subject";

import styled from "styled-components/macro";
import { getSubjectColor } from "../services/SubjectAndAssignmentService";

type CharDivProps = {
  withBgColor: boolean;
  subjType: SubjectType;
};

const CharDiv = styled.div<CharDivProps>`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ withBgColor }) =>
    withBgColor ? ({ subjType }) => getSubjectColor(subjType) : `unset`};
  padding: ${({ withBgColor }) => (withBgColor ? `0 8px` : `0`)};
`;

const DivWithTxt = styled(CharDiv)`
  p {
    margin: 0;
    color: white;
    font-size: 2rem;
  }
`;

const DivWithImage = styled(CharDiv)`
  background-color: ${({ withBgColor }) =>
    withBgColor ? ({ subjType }) => getSubjectColor(subjType) : `unset`};
  padding: 8px;

  /* TODO: set height too? */
  img {
    width: 100%;
    filter: brightness(0) invert(1);
    width: 2rem;
  }
`;

type Props = {
  subject: Subject;
  withBgColor?: boolean;
};

export const SubjectChars = ({ subject, withBgColor = false }: Props) => {
  let subjType = subject.object as SubjectType;

  return (
    <>
      {subject.useImage ? (
        <DivWithImage withBgColor={withBgColor} subjType={subjType}>
          <ImageFallback
            images={subject.availableImages}
            altText={subject.meaning_mnemonic}
          ></ImageFallback>
        </DivWithImage>
      ) : (
        <DivWithTxt withBgColor={withBgColor} subjType={subjType}>
          <p>{subject.characters}</p>
        </DivWithTxt>
      )}
    </>
  );
};
