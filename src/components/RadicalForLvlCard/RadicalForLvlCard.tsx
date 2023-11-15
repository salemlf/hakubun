import { IonSkeletonText } from "@ionic/react";
import { useRadicalSubjectsForLvl } from "../../hooks/useRadicalSubjectsForLvl";
import { useRadicalAssignmentsForLvl } from "../../hooks/useRadicalAssignmentsForLvl";
import { Subject } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";
import SubjectButton from "../SubjectButton";
import SrsStageProgressBar from "../SrsStageProgressBar/SrsStageProgressBar";
import Card from "../Card";
import ErrorMessage from "../ErrorMessage";
import {
  LoadingButtonRow,
  SubjForLvlGrid,
  SubjectButtonAndProgress,
} from "../../styles/BaseStyledComponents";

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

  let radicalCardLoading = subjectCurrLvlLoading || assignmentCurrLvlLoading;

  let errGettingData = subjectCurrLvlErr || assignmentCurrLvlErr;

  const hasAllData = subjectCurrLvlData && assignmentCurrLvlData;

  if (errGettingData && !hasAllData) {
    return (
      <Card
        title="Radicals"
        margin="12px 0"
        headerBgColor="var(--wanikani-radical)"
        headerTextColor="white"
      >
        <ErrorMessage />
      </Card>
    );
  }

  if (radicalCardLoading) {
    return (
      <Card
        title="Radicals"
        margin="12px 0"
        headerBgColor="var(--wanikani-radical)"
        headerTextColor="white"
      >
        <LoadingButtonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </LoadingButtonRow>
        <LoadingButtonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </LoadingButtonRow>
        <LoadingButtonRow>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </LoadingButtonRow>
      </Card>
    );
  }

  return (
    <Card
      title="Radicals"
      margin="12px 0"
      headerBgColor="var(--wanikani-radical)"
      headerTextColor="white"
    >
      <SubjForLvlGrid>
        {(subjectCurrLvlData as Subject[]).map((radical: Subject) => {
          return (
            <SubjectButtonAndProgress key={`col_${radical.id}`}>
              <SubjectButton
                subject={radical}
                assignment={assignmentCurrLvlData.find(
                  (assignment: Assignment) =>
                    assignment.subject_id === radical.id
                )}
                btnSize="sm"
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
            </SubjectButtonAndProgress>
          );
        })}
      </SubjForLvlGrid>
    </Card>
  );
}

export default RadicalForLvlCard;
