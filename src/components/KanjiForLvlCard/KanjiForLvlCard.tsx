import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import {
  findAssignmentWithSubjID,
  isAssignmentLocked,
} from "../../services/SubjectAndAssignmentService";
import { useKanjiSubjectsForLvl } from "../../hooks/useKanjiSubjectsForLvl";
import { useKanjiAssignmentsForLvl } from "../../hooks/useKanjiAssignmentsForLvl";
import { Subject } from "../../types/Subject";
import SubjectButton from "../SubjectButton";
import BasicCard from "../BasicCard";
import SrsStageProgressBar from "../SrsStageProgressBar/SrsStageProgressBar";
// import styled from "styled-components/macro";
import styled from "styled-components";

const KanjiItemContainer = styled(IonCol)`
  margin-bottom: 10px;
`;

interface Props {
  level: number | undefined;
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
                  <SrsStageProgressBar
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
}

export default KanjiForLvlCard;
