import { SubjDetailSubHeading, SubjDetailTxt } from "./SubjectDetailsStyled";
import { Vocabulary } from "../../types/Subject";

type Props = {
  vocab: Vocabulary;
};

export const PartsOfSpeech = ({ vocab }: Props) => {
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
};
