import { IonRow, IonSkeletonText } from "@ionic/react";

import { Kanji } from "../../types/Subject";
import {
  SubjInfoContainer,
  SubjDetailSubHeading,
  SubjDetailSection,
} from "./SubjectDetailsStyled";

import { VisuallySimilarKanji } from "./VisuallySimilarKanji";
import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { SubjectButtonList } from "../SubjectButtonList";
import { Hint } from "./Hint";
import { SubjectWideBtnList } from "../SubjectWideBtnList";

import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";

type Props = {
  kanji: Kanji;
};

export const KanjiSubjDetails = ({ kanji }: Props) => {
  let findComponents = kanji.component_subject_ids.length !== 0;
  let findSimilar = kanji.visually_similar_subject_ids.length !== 0;
  let findVocab = kanji.amalgamation_subject_ids.length !== 0;

  const {
    isLoading: radicalsUsedSubjLoading,
    data: radicalsUsedSubjData,
    error: radicalsUsedSubjErr,
  } = useSubjectsByIDs(kanji.component_subject_ids, findComponents);

  const {
    isLoading: radicalsUsedAssignmentsLoading,
    data: radicalsUsedAssignmentsData,
    error: radicalsUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanji.component_subject_ids, findComponents);

  const {
    isLoading: vocabFoundSubjLoading,
    data: vocabFoundSubjData,
    error: vocabFoundSubjErr,
  } = useSubjectsByIDs(kanji.amalgamation_subject_ids, findVocab);

  const {
    isLoading: vocabFoundAssignmentsLoading,
    data: vocabFoundAssignmentsData,
    error: vocabFoundAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanji.amalgamation_subject_ids, findVocab);

  let radicalsUsedLoading =
    findComponents &&
    (radicalsUsedSubjLoading ||
      radicalsUsedSubjErr ||
      radicalsUsedAssignmentsLoading ||
      radicalsUsedAssignmentsErr);

  let vocabFoundLoading =
    findVocab &&
    (vocabFoundSubjLoading ||
      vocabFoundSubjErr ||
      vocabFoundAssignmentsLoading ||
      vocabFoundAssignmentsErr);

  let kanjiDetailsLoading = radicalsUsedLoading && vocabFoundLoading;

  // TODO: make this laoding skeleton actually good lol
  if (kanjiDetailsLoading) {
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
      <SubjDetailSection>
        <SubjDetailSubHeading>Radical Combination</SubjDetailSubHeading>
        <SubjectButtonList
          subjList={radicalsUsedSubjData}
          assignmentList={radicalsUsedAssignmentsData}
        />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Meaning Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={kanji.meaning_mnemonic} />
        {kanji.reading_hint && <Hint hint={kanji.reading_hint} />}
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Reading Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={kanji.reading_mnemonic!} />
        {kanji.meaning_hint && <Hint hint={kanji.meaning_hint} />}
      </SubjDetailSection>
      {findSimilar && <VisuallySimilarKanji kanji={kanji} />}
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Vocabulary</SubjDetailSubHeading>
        {vocabFoundSubjData && vocabFoundSubjData.length !== 0 && (
          <SubjectWideBtnList
            subjList={vocabFoundSubjData}
            assignmentList={vocabFoundAssignmentsData}
          />
        )}
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
