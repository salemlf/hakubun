import { IonSkeletonText } from "@ionic/react";
import {
  findAssignmentWithSubjID,
  isAssignmentLocked,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { useKanjiSubjectsForLvl } from "../../hooks/subjects/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/assignments/useKanjiAssignmentsForLvl";
import { Subject } from "../../types/Subject";
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

function KanjiForLvlCard({ level }: Props) {
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

  const kanjiLoading = subjectsLoading || assignmentsLoading;

  const errGettingData = subjectsErr || assignmentsErr;

  const hasAllData = subjectsData && assignmentsData;

  if (errGettingData && !hasAllData) {
    return (
      <Card
        title="Kanji"
        margin="12px 0"
        headerBgColor="var(--wanikani-kanji)"
        headerTextColor="white"
        data-testid="kanji-for-lvl-err"
      >
        <ErrorMessage />
      </Card>
    );
  }

  //   TODO: create component for loading subject card?
  if (kanjiLoading || !hasAllData) {
    return (
      <Card
        title="Kanji"
        margin="12px 0"
        headerBgColor="var(--wanikani-kanji)"
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
      title="Kanji"
      margin="12px 0"
      headerBgColor="var(--wanikani-kanji)"
      headerTextColor="white"
    >
      <SubjForLvlGrid>
        {subjectsData.map((kanjiItem) => {
          return (
            <SubjectButtonAndProgress key={`col_${kanjiItem.id}`}>
              {assignmentsData && (
                <>
                  <SubjectButton
                    subject={kanjiItem as Subject}
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem as Subject
                    )}
                    btnSize="sm"
                    locked={isAssignmentLocked(
                      assignmentsData,
                      kanjiItem as Subject
                    )}
                    useLockedStyle={true}
                    showDetails={false}
                  />
                  <SrsStageProgressBar
                    assignment={findAssignmentWithSubjID(
                      assignmentsData,
                      kanjiItem as Subject
                    )}
                    locked={isAssignmentLocked(
                      assignmentsData,
                      kanjiItem as Subject
                    )}
                  />
                </>
              )}
            </SubjectButtonAndProgress>
          );
        })}
      </SubjForLvlGrid>
    </Card>
  );
}

export default KanjiForLvlCard;
