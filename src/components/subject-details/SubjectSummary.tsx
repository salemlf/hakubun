import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";
import { Kanji, Subject, Vocabulary } from "../../types/Subject";
import { useAssignmentBySubjID } from "../../hooks/useAssignmentBySubjID";

import { AlternativeMeanings } from "../AlternativeMeanings";
import { AssignmentSrs } from "../AssignmentSrs";
import { BasicCard } from "../cards/BasicCard";
import { SubjSummaryRow } from "./SubjectDetailsStyled";
import { KanjiReadings } from "./KanjiReadings";
import { VocabReadings } from "./VocabReadings";

import styled from "styled-components/macro";

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

  let hasReadings = subject.readings && subject.readings.length !== 0;

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
      <SummaryContainer>
        {<AlternativeMeanings subject={subject} />}
        <SubjSummaryRow className="ion-justify-content-between">
          {subject.object == "kanji" && (
            <KanjiReadings kanji={subject as Kanji} />
          )}
          {subject.object == "vocabulary" && hasReadings && (
            <VocabReadings vocab={subject as Vocabulary} />
          )}
          {/* TODO: add part of sentence */}
          <AssignmentSrs assignment={assignment} />
        </SubjSummaryRow>
      </SummaryContainer>
    </>
  );
};
