import { IonRow, IonSkeletonText } from "@ionic/react";
import { Kanji, Subject, Vocabulary } from "../../types/Subject";
import { useAssignmentBySubjID } from "../../hooks/useAssignmentBySubjID";

import { SubjectMeanings } from "../SubjectMeanings";
import { AssignmentSrs } from "../AssignmentSrs";
import { SubjSummaryRow } from "./SubjectDetailsStyled";
import { SubjDetailsKanjiReadings } from "./SubjDetailsKanjiReadings";
import { VocabReadings } from "./VocabReadings";
import { PartsOfSpeech } from "./PartsOfSpeech";

import styled from "styled-components/macro";
import { Assignment } from "../../types/Assignment";

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

const AltMeaningsAndPartsOfSpeechRow = styled(SubjSummaryRow)`
  justify-content: space-between;
  align-items: flex-end;
`;

const PartsOfSpeechContainer = styled.div`
  width: 100%;
`;

const ReadingsAndSrsRow = styled(SubjSummaryRow)`
  justify-content: space-between;
  align-items: center;
`;

type Props = {
  subject: Subject;
};

type SubjSummaryProps = {
  subject: Subject;
  assignment: Assignment | undefined;
};

const RadicalSummary = ({ subject, assignment }: SubjSummaryProps) => {
  return (
    <>
      <SubjectMeanings subject={subject} />
      <AssignmentSrs assignment={assignment} />
    </>
  );
};

const KanjiSummary = ({ subject, assignment }: SubjSummaryProps) => {
  return (
    <>
      <AltMeaningsAndPartsOfSpeechRow>
        <SubjectMeanings subject={subject} />
      </AltMeaningsAndPartsOfSpeechRow>
      <ReadingsAndSrsRow>
        <SubjDetailsKanjiReadings kanji={subject as Kanji} />
        <AssignmentSrs assignment={assignment} />
      </ReadingsAndSrsRow>
    </>
  );
};

const VocabSummary = ({ subject, assignment }: SubjSummaryProps) => {
  return (
    <>
      <AltMeaningsAndPartsOfSpeechRow>
        <SubjectMeanings subject={subject} />
      </AltMeaningsAndPartsOfSpeechRow>
      <PartsOfSpeechContainer>
        <PartsOfSpeech vocab={subject as Vocabulary} />
      </PartsOfSpeechContainer>
      <ReadingsAndSrsRow>
        <VocabReadings vocab={subject as Vocabulary} />
        <AssignmentSrs assignment={assignment} />
      </ReadingsAndSrsRow>
    </>
  );
};

export const SubjectSummary = ({ subject }: Props) => {
  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID([subject.id]);

  if (assignmentLoading || assignmentErr) {
    return (
      <>
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
      </>
    );
  }

  return (
    <SummaryContainer>
      {subject.object == "radical" && (
        <RadicalSummary subject={subject} assignment={assignment} />
      )}
      {subject.object === "kanji" && (
        <KanjiSummary subject={subject} assignment={assignment} />
      )}
      {subject.object === "vocabulary" && (
        <VocabSummary subject={subject} assignment={assignment} />
      )}
    </SummaryContainer>
  );
};
