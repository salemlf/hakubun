import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { Subject } from "../types/Subject";

import { useAssignmentBySubjID } from "../hooks/useAssignmentBySubjID";

import { AlternativeMeanings } from "./AlternativeMeanings";
import { AssignmentSrs } from "./AssignmentSrs";
import { BasicCard } from "./cards/BasicCard";
import { SubjectHeader } from "./SubjectHeader";

import styled from "styled-components";
import { SubjSummaryRow } from "./SubjectDetailsStyled";

type Props = {
  subject: Subject;
};

const Readings = styled(IonCol)`
  padding: 5px 0;
  margin-bottom: 5px;
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

  &::after {
    content: "";
    position: absolute;

    background-color: transparent;
    bottom: -50px;
    left: 0;
    height: 50px;
    width: 100%;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -25px 0 0 var(--dark-greyish-purple);
  }

  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 0);
  padding-bottom: var(--ion-padding, 16px);
`;

export const SubjectSummary = ({ subject }: Props) => {
  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID([subject.id]);

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
      {subject && <SubjectHeader subject={subject} assignment={assignment} />}
      <SummaryContainer>
        {subject && <AlternativeMeanings subject={subject} />}
        <SubjSummaryRow className="ion-justify-content-between">
          {/* TODO: display onyomi and kunyomi details */}
          {subject && subject?.object == "kanji" && (
            <ReadingContainer>
              <IonRow>
                <Readings>
                  <strong>On'yomi: </strong>...
                </Readings>
              </IonRow>
              <IonRow>
                <Readings>
                  <strong>Kun'yomi: </strong>...
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
