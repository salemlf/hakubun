import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { IonSkeletonText } from "@ionic/react";
import {
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../subject-details/SubjectDetailsStyled";
import { SubjectButtonList } from "../SubjectButtonList";

type Props = {
  kanjiIDs: number[];
  displayQuestionTxt?: boolean;
};

export const KanjiUsedInVocab = ({
  kanjiIDs,
  displayQuestionTxt = false,
}: Props) => {
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
};
