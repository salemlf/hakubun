import { IonRow, IonSkeletonText } from "@ionic/react";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Radical } from "../../types/Subject";
import SubjectButtonList from "../SubjectButtonList/SubjectButtonList";
import TxtWithSubjTags from "../TxtWithSubjTags/TxtWithSubjTags";
import RadicalNameMnemonic from "../RadicalNameMnemonic/RadicalNameMnemonic";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../../styles/SubjectDetailsStyled";

type Props = {
  radical: Radical;
};

function RadicalSubjDetails({ radical }: Props) {
  const {
    isLoading: usedInKanjiSubjLoading,
    data: usedInKanjiSubjData,
    error: usedInKanjiSubjErr,
  } = useSubjectsByIDs(radical.amalgamation_subject_ids);

  const {
    isLoading: usedInKanjiAssignmentsLoading,
    data: usedInKanjiAssignmentsData,
    error: usedInKanjiAssignmentsErr,
  } = useAssignmentsBySubjIDs(radical.amalgamation_subject_ids);

  let usedInKanjiLoading =
    usedInKanjiSubjLoading ||
    usedInKanjiSubjErr ||
    usedInKanjiAssignmentsLoading ||
    usedInKanjiAssignmentsErr;

  // TODO: improve loading skeleton
  if (usedInKanjiLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <TxtWithSubjTags textWithTags={radical.meaning_mnemonic} />
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjInfoContainer>
      <RadicalNameMnemonic radical={radical} />
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Kanji</SubjDetailSubHeading>
        <SubjectButtonList
          subjList={usedInKanjiSubjData}
          assignmentList={usedInKanjiAssignmentsData}
        />
      </SubjDetailSection>
    </SubjInfoContainer>
  );
}

export default RadicalSubjDetails;
