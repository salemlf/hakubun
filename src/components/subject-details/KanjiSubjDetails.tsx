import { IonRow, IonSkeletonText } from "@ionic/react";

import { Kanji } from "../../types/Subject";
import {
  SubjInfoContainer,
  SubjDetailSubHeading,
  SubjDetailSection,
} from "./SubjectDetailsStyled";

import { VisuallySimilarKanji } from "./VisuallySimilarKanji";
import { SubjectWideBtnList } from "../SubjectWideBtnList";
import { RadicalCombination } from "../RadicalCombination";
import { KanjiMeaningMnemonic } from "../KanjiMeaningMnemonic";
import { KanjiReadingMnemonic } from "../subjects/KanjiReadingMnemonic";

import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";

type Props = {
  kanji: Kanji;
};

export const KanjiSubjDetails = ({ kanji }: Props) => {
  let findSimilar = kanji.visually_similar_subject_ids.length !== 0;
  let findVocab = kanji.amalgamation_subject_ids.length !== 0;

  const {
    isLoading: vocabFoundSubjLoading,
    data: vocabFoundSubjData,
    error: vocabFoundSubjErr,
  } = useSubjectsByIDs(kanji.amalgamation_subject_ids, findVocab);

  let vocabFoundLoading =
    findVocab && (vocabFoundSubjLoading || vocabFoundSubjErr);

  // TODO: make this laoding skeleton actually good lol
  if (vocabFoundLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjInfoContainer>
      <RadicalCombination kanji={kanji} />
      <KanjiMeaningMnemonic kanji={kanji} />
      <KanjiReadingMnemonic kanji={kanji} />
      {findSimilar && <VisuallySimilarKanji kanji={kanji} />}
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Vocabulary</SubjDetailSubHeading>
        {vocabFoundSubjData && vocabFoundSubjData.length !== 0 && (
          <SubjectWideBtnList subjList={vocabFoundSubjData} />
        )}
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
