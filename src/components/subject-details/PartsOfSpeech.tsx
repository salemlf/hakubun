import { SubjDetailTxt, SubjSummaryCol } from "./SubjectDetailsStyled";
import { Vocabulary } from "../../types/Subject";

import styled from "styled-components/macro";

type ContainerProps = {
  alignLeft: boolean;
};

const PartsofSpeechContainer = styled(SubjSummaryCol)<ContainerProps>`
  text-align: right;
  text-align: ${({ alignLeft }) => (alignLeft ? `left` : `right`)};
  flex: 0 0 35%;
  padding-left: 0px;
`;

type Props = {
  vocab: Vocabulary;
  alignLeft?: boolean;
};

export const PartsOfSpeech = ({ vocab, alignLeft = false }: Props) => {
  let partsOfSpeech = vocab.parts_of_speech;

  return (
    <PartsofSpeechContainer alignLeft={alignLeft}>
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
