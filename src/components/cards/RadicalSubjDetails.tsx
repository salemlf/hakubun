import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { SubjectCardList } from "../SubjectCardList";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../SubjectDetailsStyled";

import { Radical, Subject } from "../../types/Subject";

import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";

type Props = {
  radical: Radical;
};

export const RadicalSubjDetails = ({ radical }: Props) => {
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

  // TODO: improve laoding skeleton
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
      <SubjDetailSection>
        <SubjDetailSubHeading>Name Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags textWithTags={radical.meaning_mnemonic} />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Kanji</SubjDetailSubHeading>
        <SubjectCardList
          subjList={usedInKanjiSubjData}
          assignmentList={usedInKanjiAssignmentsData}
        />
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
