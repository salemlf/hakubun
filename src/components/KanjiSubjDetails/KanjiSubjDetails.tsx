import { IonIcon, IonRow, IonSkeletonText } from "@ionic/react";
import { useSubjectsByIDs } from "../../hooks/subjects/useSubjectsByIDs";
import { Kanji } from "../../types/Subject";
import KanjiMeaningMnemonic from "../KanjiMeaningMnemonic/KanjiMeaningMnemonic";
import RadicalCombination from "../RadicalCombination/RadicalCombination";
import SubjectWideBtnList from "../SubjectWideBtnList/SubjectWideBtnList";
import VisuallySimilarKanji from "./VisuallySimilarKanji";
import KanjiReadingMnemonic from "../KanjiReadingMnemonic/KanjiReadingMnemonic";
import MagnifyingGlassIcon from "../../images/magnifying-glass-color.svg";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";
import { FoundInHeadingContainer } from "../../styles/BaseStyledComponents";

type Props = {
  kanji: Kanji;
};

function KanjiSubjDetails({ kanji }: Props) {
  const findSimilar = kanji.visually_similar_subject_ids.length !== 0;
  const findVocab = kanji.amalgamation_subject_ids.length !== 0;

  const { isLoading: vocabFoundSubjLoading, data: vocabFoundSubjData } =
    useSubjectsByIDs(kanji.amalgamation_subject_ids, findVocab, true);

  // TODO: make this laoding skeleton actually good lol
  if (vocabFoundSubjLoading) {
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
        <FoundInHeadingContainer>
          <IonIcon src={MagnifyingGlassIcon} />
          <SubjDetailSubHeading>Found in Vocabulary</SubjDetailSubHeading>
        </FoundInHeadingContainer>
        {findVocab && vocabFoundSubjData && (
          <SubjectWideBtnList subjList={vocabFoundSubjData} />
        )}
      </SubjDetailSection>
    </SubjInfoContainer>
  );
}

export default KanjiSubjDetails;
