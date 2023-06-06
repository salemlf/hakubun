import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { Subject } from "../types/Subject";

import { useAssignmentBySubjID } from "../hooks/useAssignmentBySubjID";

import { AlternativeMeanings } from "./AlternativeMeanings";
import { AssignmentSrs } from "./AssignmentSrs";
import { BasicCard } from "./cards/BasicCard";
import { SubjectHeader } from "./SubjectHeader";
import { SubjSummaryRow } from "./SubjectDetailsStyled";

import { getKanjiReadings } from "../services/SubjectAndAssignmentService";

import styled from "styled-components/macro";

const Readings = styled(IonCol)`
  padding: 3px 0;
`;

const ReadingContainer = styled(IonCol)`
  display: flex;
  flex-direction: column;
  padding-left: 0;
`;

const SummaryContainer = styled(IonRow)`
  display: flex;

  background-color: var(--dark-greyish-purple);
  position: relative;

  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 0);
  padding-bottom: var(--ion-padding, 5px);

  h3:first-of-type {
    margin-top: 5px;
  }
`;

type Props = {
  subject: Subject;
};

export const SubjectSummary = ({ subject }: Props) => {
  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID([subject.id]);

  let onyomiReadings;
  let kunyomiReadings;
  if (subject.object == "kanji") {
    onyomiReadings = getKanjiReadings(subject, "onyomi");
    kunyomiReadings = getKanjiReadings(subject, "kunyomi");
  }

  // TODO: change this from card
  if (assignmentLoading || assignmentErr) {
    return (
      <BasicCard isLoading={true}>
        <IonRow className="ion-align-items-center ion-justify-content-start">
          <IonCol>
            <IonSkeletonText animated={true}></IonSkeletonText>
          </IonCol>
        </IonRow>
      </BasicCard>
    );
  }

  return (
    <>
      {/* {<SubjectHeader subject={subject} assignment={assignment} />} */}
      <SummaryContainer>
        {<AlternativeMeanings subject={subject} />}
        <SubjSummaryRow className="ion-justify-content-between">
          {/* TODO: display onyomi and kunyomi details */}
          {subject.object == "kanji" && (
            <ReadingContainer>
              <IonRow>
                <Readings>
                  <strong>On'yomi: </strong>
                  {onyomiReadings && onyomiReadings.length
                    ? onyomiReadings
                        .map((onyomiReading: any) => {
                          return onyomiReading.reading;
                        })
                        .join(", ")
                    : "-"}
                </Readings>
              </IonRow>
              <IonRow>
                <Readings>
                  <strong>Kun'yomi: </strong>
                  {kunyomiReadings && kunyomiReadings.length
                    ? kunyomiReadings
                        .map((kunyomiReading: any) => {
                          return kunyomiReading.reading;
                        })
                        .join(", ")
                    : "-"}
                </Readings>
              </IonRow>
            </ReadingContainer>
          )}
          <AssignmentSrs assignment={assignment} />
        </SubjSummaryRow>
      </SummaryContainer>
    </>
  );
};
