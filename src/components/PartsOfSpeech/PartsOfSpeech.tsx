import { Vocabulary } from "../../types/Subject";
import {
  SubjDetailSubHeading,
  SubjDetailTxt,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const PartsOfSpeechTxt = styled(SubjDetailTxt)`
  /* font-family: var(--japanese-with-english-fallback-font-family); */
`;

type Props = {
  vocab: Vocabulary;
};

// TODO: change so uses Japanese font when japanese chars
function PartsOfSpeech({ vocab }: Props) {
  let partsOfSpeech = vocab.parts_of_speech;

  return (
    <>
      <SubjDetailSubHeading>Parts of Speech</SubjDetailSubHeading>
      <PartsOfSpeechTxt>
        {partsOfSpeech && partsOfSpeech.length
          ? partsOfSpeech
              .map((part: any) => {
                return part;
              })
              .join(", ")
          : "-"}
      </PartsOfSpeechTxt>
    </>
  );
}

export default PartsOfSpeech;
