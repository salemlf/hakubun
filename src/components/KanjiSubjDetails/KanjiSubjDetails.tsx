import { IonRow, IonSkeletonText } from "@ionic/react";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Kanji, Subject } from "../../types/Subject";
import KanjiMeaningMnemonic from "../KanjiMeaningMnemonic/KanjiMeaningMnemonic";
import RadicalCombination from "../RadicalCombination/RadicalCombination";
import SubjectWideBtnList from "../SubjectWideBtnList/SubjectWideBtnList";
import VisuallySimilarKanji from "./VisuallySimilarKanji";
import KanjiReadingMnemonic from "../KanjiReadingMnemonic/KanjiReadingMnemonic";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import { useEffect, useState } from "react";

type Props = {
  kanji: Kanji;
};

function KanjiSubjDetails({ kanji }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [vocabFound, setVocabFound] = useState<Subject[]>([]);
  let findSimilar = kanji.visually_similar_subject_ids.length !== 0;
  let findVocab = kanji.amalgamation_subject_ids.length !== 0;

  const {
    isLoading: vocabFoundSubjLoading,
    data: vocabFoundSubjData,
    error: vocabFoundSubjErr,
  } = useSubjectsByIDs(kanji.amalgamation_subject_ids, findVocab);

  useEffect(() => {
    if (!vocabFoundSubjLoading && vocabFoundSubjData) {
      let sortedByLvlVocab = [...vocabFoundSubjData].sort(
        (a, b) => a.level - b.level
      );

      setVocabFound(sortedByLvlVocab);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [vocabFoundSubjLoading]);

  // TODO: make this laoding skeleton actually good lol
  if (isLoading) {
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
        {findVocab && <SubjectWideBtnList subjList={vocabFound} />}
      </SubjDetailSection>
    </SubjInfoContainer>
  );
}

export default KanjiSubjDetails;
