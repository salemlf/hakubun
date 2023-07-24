import { Vocabulary } from "../../types/Subject";
import {
  SubjDetailSubHeading,
  SubjDetailTxt,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  vocab: Vocabulary;
};

function PartsOfSpeech({ vocab }: Props) {
  let partsOfSpeech = vocab.parts_of_speech;

  return (
    <>
      <SubjDetailSubHeading>Parts of Speech</SubjDetailSubHeading>
      <SubjDetailTxt>
        {partsOfSpeech && partsOfSpeech.length
          ? partsOfSpeech
              .map((part: any) => {
                return part;
              })
              .join(", ")
          : "-"}
      </SubjDetailTxt>
    </>
  );
}

export default PartsOfSpeech;
