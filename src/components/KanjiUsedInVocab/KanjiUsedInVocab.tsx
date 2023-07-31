import { IonSkeletonText } from "@ionic/react";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  kanjiIDs: number[];
  displayQuestionTxt?: boolean;
};

// TODO: sort so in same order as usage
function KanjiUsedInVocab({ kanjiIDs, displayQuestionTxt = false }: Props) {
  const {
    isLoading: kanjiUsedSubjLoading,
    data: kanjiUsedSubjData,
    error: kanjiUsedSubjErr,
  } = useSubjectsByIDs(kanjiIDs);

  const {
    isLoading: kanjiUsedAssignmentsLoading,
    data: kanjiUsedAssignmentsData,
    error: kanjiUsedAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanjiIDs);

  let loading =
    kanjiUsedSubjLoading ||
    kanjiUsedSubjErr ||
    kanjiUsedAssignmentsLoading ||
    kanjiUsedAssignmentsErr;

  if (loading) {
    return (
      <div className="ion-padding">
        <IonSkeletonText animated={true}></IonSkeletonText>
        <IonSkeletonText animated={true}></IonSkeletonText>
      </div>
    );
  }

  return (
    <SubjDetailSection>
      <SubjDetailSubHeading>Kanji Used</SubjDetailSubHeading>
      <SubjectButtonList
        subjList={kanjiUsedSubjData}
        assignmentList={kanjiUsedAssignmentsData}
      />
      {displayQuestionTxt && (
        <>
          <p>
            Does the combination of kanji meanings somewhat fit the vocabulary
            meaning?
          </p>
          <p>
            Based on the kanji composition, can you guess the reading of the
            vocabulary?
          </p>
        </>
      )}
    </SubjDetailSection>
  );
}

export default KanjiUsedInVocab;
