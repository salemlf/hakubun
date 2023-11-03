import { IonIcon, IonSkeletonText } from "@ionic/react";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { Kanji } from "../../types/Subject";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import SimilarCatsIcon from "../../images/similar-cats.svg";
import {
  SubjDetailSubHeading,
  SubjDetailSection,
} from "../../styles/SubjectDetailsStyled";
import { IconHeadingContainer } from "../../styles/BaseStyledComponents";

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
      <IconHeadingContainer>
        <IonIcon src={SimilarCatsIcon} />
        <SubjDetailSubHeading>Visually Similar Kanji</SubjDetailSubHeading>
      </IconHeadingContainer>
      <SubjectButtonList
        btnSize="lg"
        subjList={similarKanjiSubjData}
        assignmentList={similarKanjiAssignmentsData ?? []}
      />
    </SubjDetailSection>
  );
}

export default VisuallySimilarKanji;
