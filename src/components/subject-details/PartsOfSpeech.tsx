import { SubjDetailTxt, SubjSummaryCol } from "./SubjectDetailsStyled";
import { Vocabulary } from "../../types/Subject";

import styled from "styled-components/macro";

type Props = {
  vocab: Vocabulary;
};

const PartsofSpeechContainer = styled(SubjSummaryCol)`
  text-align: right;
  flex: 0 0 35%;
`;

export const PartsOfSpeech = ({ vocab }: Props) => {
  let partsOfSpeech = vocab.parts_of_speech;

  return (
    <PartsofSpeechContainer>
      <SubjDetailTxt>
        {partsOfSpeech && partsOfSpeech.length
          ? partsOfSpeech
              .map((part: any) => {
                return part;
              })
              .join(", ")
          : "-"}
      </SubjDetailTxt>
    </PartsofSpeechContainer>
  );
};
