import { IonSkeletonText } from "@ionic/react";

import {
  SubjDetailSubHeading,
  SubjDetailSection,
} from "../subject-details/SubjectDetailsStyled";

import { Kanji } from "../../types/Subject";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { SubjectButtonList } from "../SubjectButtonList";

type Props = {
  kanji: Kanji;
};

function VisuallySimilarKanji({ kanji }: Props) {
  const {
    isLoading: similarKanjiSubjLoading,
    data: similarKanjiSubjData,
    error: similarKanjiSubjErr,
  } = useSubjectsByIDs(kanji.visually_similar_subject_ids);

  const {
    isLoading: similarKanjiAssignmentsLoading,
    data: similarKanjiAssignmentsData,
    error: similarKanjiAssignmentsErr,
  } = useAssignmentsBySubjIDs(kanji.visually_similar_subject_ids);

  let loading =
    similarKanjiAssignmentsLoading ||
    similarKanjiAssignmentsErr ||
    similarKanjiSubjLoading ||
    similarKanjiSubjErr;

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
      <SubjDetailSubHeading>Visually Similar Kanji</SubjDetailSubHeading>
      <SubjectButtonList
        subjList={similarKanjiSubjData}
        assignmentList={similarKanjiAssignmentsData}
      />
    </SubjDetailSection>
  );
}

export default VisuallySimilarKanji;
