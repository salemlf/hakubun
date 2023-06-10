import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "./SubjectDetailsStyled";

import { Vocabulary } from "../../types/Subject";

type Props = {
  vocab: Vocabulary;
};

export const VocabSubjDetails = ({ vocab }: Props) => {
  return (
    <SubjInfoContainer>
      <SubjDetailSection>
        <SubjDetailSubHeading>Context Sentences</SubjDetailSubHeading>
        <p>...</p>
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Meaning Explanation</SubjDetailSubHeading>
        <p>...</p>
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
