import ImageFallback from "./ImageFallback";
import { Subject } from "../types/Subject";

import styled from "styled-components/macro";

const DivWithTxt = styled.div`
  p {
    margin: 0;
    color: white;
    font-size: 2rem;
  }
`;

const DivWithImage = styled.div`
  padding: 4px;

  img {
    width: 100%;
    filter: brightness(0) invert(1);
  }
`;

type Props = {
  subject: Subject;
};

export const SubjectChars = ({ subject }: Props) => {
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
        <DivWithTxt>
          <p>{subject.characters}</p>
        </DivWithTxt>
      )}
    </>
  );
};
