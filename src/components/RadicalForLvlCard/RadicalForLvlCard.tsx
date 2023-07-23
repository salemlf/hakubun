import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import { useRadicalSubjectsForLvl } from "../../hooks/useRadicalSubjectsForLvl";
import { useRadicalAssignmentsForLvl } from "../../hooks/useRadicalAssignmentsForLvl";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";
import BasicCard from "../BasicCard";
import SubjectButton from "../SubjectButton";
import SrsStageProgressBar from "../SrsStageProgressBar/SrsStageProgressBar";
import styled from "styled-components/macro";

const RadicalItemContainer = styled(IonCol)`
  margin-bottom: 10px;
`;

interface Props {
  level: number | undefined;
}

function RadicalForLvlCard({ level }: Props) {
  const {
    isLoading: subjectCurrLvlLoading,
    data: subjectCurrLvlData,
    error: subjectCurrLvlErr,
  } = useRadicalSubjectsForLvl(level);

  const {
    isLoading: assignmentCurrLvlLoading,
    data: assignmentCurrLvlData,
    error: assignmentCurrLvlErr,
  } = useRadicalAssignmentsForLvl(level);

  let radicalCardLoading =
    subjectCurrLvlLoading ||
    subjectCurrLvlErr ||
    assignmentCurrLvlLoading ||
    assignmentCurrLvlErr;

  if (radicalCardLoading) {
    return (
      <BasicCard isLoading={true}>
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

  return (
    <BasicCard title="Radicals" isLoading={false}>
      <IonRow class="ion-align-items-center ion-justify-content-start">
        {(subjectCurrLvlData as Subject[]).map((radical: Subject) => {
          return (
            <RadicalItemContainer key={`col_${radical.id}`} size="2">
              <SubjectButton
                subject={radical}
                assignment={assignmentCurrLvlData.find(
                  (assignment: Assignment) =>
                    assignment.subject_id === radical.id
                )}
                locked={false}
                useLockedStyle={false}
                showDetails={false}
              />
              <SrsStageProgressBar
                assignment={assignmentCurrLvlData.find(
                  (assignment: Assignment) =>
                    assignment.subject_id === radical.id
                )}
                locked={false}
              />
            </RadicalItemContainer>
          );
        })}
      </IonRow>
    </BasicCard>
  );
}

export default RadicalForLvlCard;
