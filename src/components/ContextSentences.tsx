import { IonRow, IonCol } from "@ionic/react";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "./subject-details/SubjectDetailsStyled";

import styled from "styled-components/macro";
import { ContextSentence } from "../types/Subject";

const ContextSentenceContainer = styled(IonRow)`
  display: flex;
  flex-direction: row;
  margin-left: -3px;
`;

const SentenceGroup = styled(IonCol)`
  flex-direction: column;
  flex-basis: 100%;
  display: flex;
  margin-bottom: 10px;
`;

const ContextSentenceTxt = styled.p`
  margin-top: 0;
  margin-bottom: 2px;
`;

// TODO: improve styling
type Props = {
  sentences: ContextSentence[];
};
export const ContextSentences = ({ sentences }: Props) => {
  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Context Sentences</SubjDetailSubHeading>
      <ContextSentenceContainer>
        {(sentences as ContextSentence[]).map(
          (sentence: ContextSentence, index: number) => {
            return (
              <SentenceGroup key={`col_${index}`}>
                <ContextSentenceTxt>{sentence.ja}</ContextSentenceTxt>
                <ContextSentenceTxt>{sentence.en}</ContextSentenceTxt>
              </SentenceGroup>
            );
          }
        )}
      </ContextSentenceContainer>
    </SubjDetailSection>
  );
};
