import { useState } from "react";
import { IonIcon } from "@ionic/react";
import { ContextSentence } from "../../types/Subject";
import Button from "../Button/Button";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import ContextIcon from "../../images/context.svg";
import OpenEyeIcon from "../../images/open-eye.svg";
import CrossedOutEyeIcon from "../../images/crossed-out-eye.svg";
import styled from "styled-components";

const ContextSentenceContainer = styled.div`
  margin-left: -3px;
`;

const SentenceGroup = styled.div`
  display: flex;
  flex-basis: 100%;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

const ContextSentenceTxt = styled.p`
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 2px;
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

const JapaneseContextSentenceTxt = styled(ContextSentenceTxt)`
  font-family: var(--japanese-font-family);
`;

const EnglishSentenceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EyeBallButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 5px;
  color: black;
  margin-left: 10px;
`;

const EyeIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

type EnglishContextSentenceTxtProps = {
  blurtext: boolean;
};

const EnglishContextSentenceTxt = styled(
  ContextSentenceTxt
)<EnglishContextSentenceTxtProps>`
  ${({ blurtext }) => blurtext && "filter: blur(5px);"}
`;

// TODO: improve styling
type Props = {
  sentences: ContextSentence[];
};

function ContextSentences({ sentences }: Props) {
  const initialBlurState = Array(sentences.length).fill(true);
  const [blurStates, setBlurStates] = useState(initialBlurState);

  const toggleTranslationBlur = (index: number) => {
    const newBlurStates = [...blurStates];
    newBlurStates[index] = !newBlurStates[index];
    setBlurStates(newBlurStates);
  };

  return (
    <SubjDetailSection>
      <IconHeadingContainer>
        <IonIcon src={ContextIcon} />
        <SubjDetailSubHeading>Context Sentences</SubjDetailSubHeading>
      </IconHeadingContainer>
      <ContextSentenceContainer>
        {(sentences as ContextSentence[]).map(
          (sentence: ContextSentence, index: number) => {
            return (
              <SentenceGroup key={`col_${index}`}>
                <JapaneseContextSentenceTxt>
                  {sentence.ja}
                </JapaneseContextSentenceTxt>
                <EnglishSentenceContainer>
                  <EnglishContextSentenceTxt blurtext={blurStates[index]}>
                    {sentence.en}
                  </EnglishContextSentenceTxt>
                  <EyeBallButton
                    onPress={() => toggleTranslationBlur(index)}
                    aria-label={`Show/Hide English Translation for Context Sentence ${index}`}
                  >
                    <EyeIcon
                      src={blurStates[index] ? OpenEyeIcon : CrossedOutEyeIcon}
                    />
                  </EyeBallButton>
                </EnglishSentenceContainer>
              </SentenceGroup>
            );
          }
        )}
      </ContextSentenceContainer>
    </SubjDetailSection>
  );
}

export default ContextSentences;
