import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";
import {
  isAssignmentLocked,
  findAssignmentWithSubjID,
} from "../../services/SubjectAndAssignmentService";
import { Subject } from "../../types/Subject";
import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";
import { StepProgressBar } from "../progress/StepProgressBar";
import SubjectButton from "../SubjectButton/SubjectButton";
import { BasicCard } from "./BasicCard";

import styled from "styled-components/macro";

const KanjiItemContainer = styled(IonCol)`
  margin-bottom: 10px;
`;

interface Props {
  level: number | undefined;
}

export const KanjiContainer = ({ level }: Props) => {
  const {
    isLoading: subjectsLoading,
    data: subjectsData,
    error: subjectsErr,
  } = useKanjiSubjectsForLvl(level);

  const {
    isLoading: assignmentsLoading,
    data: assignmentsData,
    error: assignmentsErr,
  } = useKanjiAssignmentsForLvl(level);

  let kanjiLoading =
    subjectsLoading || subjectsErr || assignmentsLoading || assignmentsErr;

  //   TODO: create component for loading subject card?
  if (kanjiLoading) {
    return (
      <BasicCard title="" isLoading={true}>
        <IonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </IonRow>
        <IonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </IonRow>
        <IonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </IonRow>
        <IonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </IonRow>
      </BasicCard>
    );
  }

  // TODO: sort so locked kanji are last
  return (
    <BasicCard title="Kanji" isLoading={false}>
      <IonRow class="ion-align-items-center ion-justify-content-start">
        {(subjectsData as Subject[]).map((kanjiItem: any) => {
          return (
            <KanjiItemContainer key={`col_${kanjiItem.id}`} size="2">
              {assignmentsData && (
                <>
                  <SubjectButton
                    subject={kanjiItem}
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem
                    )}
                    locked={isAssignmentLocked(assignmentsData, kanjiItem)}
                    useLockedStyle={true}
                    showDetails={false}
                  />
                  <StepProgressBar
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem
                    )}
                    locked={isAssignmentLocked(assignmentsData, kanjiItem)}
                  />
                </>
              )}
            </KanjiItemContainer>
          );
        })}
      </IonRow>
    </BasicCard>
  );
};
