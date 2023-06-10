import { IonSkeletonText } from "@ionic/react";
import ImageFallback from "./ImageFallback";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { SubjectType } from "../types/Subject";

import styled from "styled-components/macro";

const DefaultDiv = styled.div`
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;

  --box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
`;

type TxtDivProps = {
  subjType: SubjectType;
};

const DivWithTxt = styled(DefaultDiv)<TxtDivProps>`
  background-color: ${({ subjType }) =>
    subjType === "radical" ? `var(--wanikani-blue)` : `var(--wanikani-pink)`};

  p {
    margin: 0;
    color: white;
    font-size: 2rem;
  }
`;

const DivWithImage = styled(DefaultDiv)`
  background-color: var(--wanikani-blue);
  padding: 4px;

  img {
    width: 100%;
    filter: brightness(0) invert(1);
  }
`;

const SubjectName = styled.h1`
  margin: 0;
`;

type Props = {
  subject: Subject;
};

export const SubjNameAndCharacter = ({ subject }: Props) => {
  // TODO: display loading skeletons
  return (
    <>
      {subject.useImage ? (
        <DivWithImage>
          <ImageFallback
            images={subject.availableImages}
            altText={subject.meaning_mnemonic}
          ></ImageFallback>
        </DivWithImage>
      ) : (
        <DivWithTxt subjType={subject.object}>
          <p>{subject.characters}</p>
        </DivWithTxt>
      )}

      {subject && <SubjectName>{getSubjectDisplayName(subject)}</SubjectName>}
    </>
  );
};
