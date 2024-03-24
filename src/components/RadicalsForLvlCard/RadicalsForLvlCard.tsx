import { IonSkeletonText } from "@ionic/react";
import { useRadicalSubjectsForLvl } from "../../hooks/useRadicalSubjectsForLvl";
import { useRadicalAssignmentsForLvl } from "../../hooks/assignments/useRadicalAssignmentsForLvl";
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
  level: number;
}

function RadicalsForLvlCard({ level }: Props) {
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

  const radicalCardLoading = subjectCurrLvlLoading || assignmentCurrLvlLoading;
  const errGettingData = subjectCurrLvlErr || assignmentCurrLvlErr;

  const hasAllData = subjectCurrLvlData && assignmentCurrLvlData;

  if (errGettingData && !hasAllData) {
    return (
      <Card
        title="Radicals"
        margin="12px 0"
        headerBgColor="var(--wanikani-radical)"
        headerTextColor="white"
        data-testid="radicals-for-lvl-err"
      >
        <ErrorMessage />
      </Card>
    );
  }

  if (radicalCardLoading || !hasAllData) {
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
        {subjectCurrLvlData.map((radical) => {
          return (
            <SubjectButtonAndProgress key={`col_${radical.id}`}>
              <SubjectButton
                subject={radical as Subject}
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

export default RadicalsForLvlCard;
