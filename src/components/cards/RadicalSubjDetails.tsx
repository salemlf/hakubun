import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { TxtWithSubjTags } from "../TxtWithSubjTags";
import { SubjectCard } from "./SubjectCard";
import {
  SubjInfoContainer,
  SubjDetailSection,
  SubjDetailSubHeading,
} from "../SubjectDetailsStyled";

import styles from "./RadicalSubjDetails.module.scss";
import { Subject } from "../../types/Subject";

import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useAssignmentsBySubjIDs } from "../../hooks/useAssignmentsBySubjIDs";
import {
  isAssignmentLocked,
  findAssignmentWithSubjID,
} from "../../services/SubjectAndAssignmentService";

type Props = {
  subject: Subject;
};

export const RadicalSubjDetails = ({ subject }: Props) => {
  const {
    isLoading: usedInKanjiSubjLoading,
    data: usedInKanjiSubjData,
    error: usedInKanjiSubjErr,
  } = useSubjectsByIDs(subject.amalgamation_subject_ids);

  const {
    isLoading: usedInKanjiAssignmentsLoading,
    data: usedInKanjiAssignmentsData,
    error: usedInKanjiAssignmentsErr,
  } = useAssignmentsBySubjIDs(subject.amalgamation_subject_ids);

  let usedInKanjiLoading =
    usedInKanjiSubjLoading ||
    usedInKanjiSubjErr ||
    usedInKanjiAssignmentsLoading ||
    usedInKanjiAssignmentsErr;

  if (usedInKanjiLoading) {
    return (
      <IonRow class="ion-justify-content-start">
        <div className="ion-padding">
          <IonSkeletonText animated={true}></IonSkeletonText>
          <TxtWithSubjTags mnemonic={subject.meaning_mnemonic} />
          <IonSkeletonText animated={true}></IonSkeletonText>
        </div>
      </IonRow>
    );
  }

  return (
    <SubjInfoContainer>
      <SubjDetailSection>
        <SubjDetailSubHeading>Name Mnemonic</SubjDetailSubHeading>
        <TxtWithSubjTags mnemonic={subject.meaning_mnemonic} />
      </SubjDetailSection>
      <SubjDetailSection>
        <SubjDetailSubHeading>Found in Kanji</SubjDetailSubHeading>
        <IonRow class="ion-align-items-center ion-justify-content-start">
          {(usedInKanjiSubjData as Subject[]).map((kanjiSubj: any) => {
            return (
              <IonCol
                key={`col_${kanjiSubj.id}`}
                size="3"
                className={`${styles.foundInKanjiContainer}`}
              >
                {usedInKanjiAssignmentsData && (
                  <>
                    <SubjectCard
                      subject={kanjiSubj}
                      assignment={findAssignmentWithSubjID(
                        usedInKanjiAssignmentsData,
                        kanjiSubj
                      )}
                      locked={isAssignmentLocked(
                        usedInKanjiAssignmentsData,
                        kanjiSubj
                      )}
                      isButtonLink={true}
                      useLockedStyle={false}
                    ></SubjectCard>
                  </>
                )}
              </IonCol>
            );
          })}
        </IonRow>
      </SubjDetailSection>
    </SubjInfoContainer>
  );
};
