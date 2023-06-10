import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import {
  Kanji,
  Subject,
  SubjectReading,
  Vocabulary,
} from "../../types/Subject";

import { useAssignmentBySubjID } from "../../hooks/useAssignmentBySubjID";

import { AlternativeMeanings } from "../AlternativeMeanings";
import { AssignmentSrs } from "../AssignmentSrs";
import { BasicCard } from "../cards/BasicCard";
import { SubjSummaryRow } from "./SubjectDetailsStyled";

import {
  getKanjiReadings,
  getVocabReadings,
} from "../../services/SubjectAndAssignmentService";

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

type KanjiReadingProps = {
  kanji: Kanji;
};

const KanjiReadings = ({ kanji }: KanjiReadingProps) => {
  let onyomiReadings = getKanjiReadings(kanji.readings, "onyomi");
  let kunyomiReadings = getKanjiReadings(kanji.readings, "kunyomi");

  return (
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
  );
};

type VocabReadingProps = {
  vocab: Vocabulary;
};
// TODO: add audio
const VocabReadings = ({ vocab }: VocabReadingProps) => {
  let hasReadings = vocab.readings && vocab.readings.length !== 0;
  let readings;
  if (hasReadings) {
    readings = getVocabReadings(vocab.readings!);
  }

  return hasReadings ? (
    <ReadingContainer>
      <IonRow>
        <Readings>
          <strong>Readings: </strong>
          {readings && readings.length
            ? readings
                .map((vocabReading: any) => {
                  return vocabReading.reading;
                })
                .join(", ")
            : "-"}
        </Readings>
      </IonRow>
    </ReadingContainer>
  ) : (
    <ReadingContainer>
      <IonRow>
        <Readings>
          <strong>Readings: </strong>
          {vocab.characters}
        </Readings>
      </IonRow>
    </ReadingContainer>
  );
};

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
