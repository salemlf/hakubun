import { IonRow, IonSkeletonText } from "@ionic/react";
import { useAssignmentBySubjID } from "../../hooks/useAssignmentBySubjID";
import { Assignment } from "../../types/Assignment";
import { Subject, Kanji, Vocabulary } from "../../types/Subject";
import AssignmentSrs from "./AssignmentSrs";
import PartsOfSpeech from "../PartsOfSpeech";
import SubjectMeanings from "../SubjectMeanings/SubjectMeanings";
import SubjDetailsKanjiReadings from "./SubjDetailsKanjiReadings";
import VocabReadings from "../VocabReadings/VocabReadings";
import { SubjSummaryRow } from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

const SummaryContainer = styled(IonRow)`
  display: flex;

  background-color: var(--dark-greyish-purple);
  position: relative;

  padding-inline-start: var(--ion-padding, 16px);
  padding-inline-end: var(--ion-padding, 16px);
  padding-top: var(--ion-padding, 0);
  padding-bottom: var(--ion-padding, 5px);
  margin-bottom: 10px;

  h3:first-of-type {
    margin-top: 5px;
  }
`;

const PartsOfSpeechContainer = styled.div`
  width: 100%;
`;

const SpaceBetweenRow = styled(SubjSummaryRow)`
  justify-content: space-between;
  align-items: flex-end;
`;

type SubjSummaryProps = {
  subject: Subject;
  assignment: Assignment | undefined;
};

const RadicalSummary = ({ subject, assignment }: SubjSummaryProps) => {
  return (
    <>
      <SubjectMeanings subject={subject} showPrimaryMeaning={false} />
      <AssignmentSrs assignment={assignment} />
    </>
  );
};

const KanjiSummary = ({ subject, assignment }: SubjSummaryProps) => {
  return (
    <>
      <SubjSummaryRow>
        <SubjectMeanings subject={subject} showPrimaryMeaning={false} />
      </SubjSummaryRow>
      <SpaceBetweenRow>
        <SubjDetailsKanjiReadings kanji={subject as Kanji} />
        <AssignmentSrs assignment={assignment} />
      </SpaceBetweenRow>
    </>
  );
};

const VocabSummary = ({ subject, assignment }: SubjSummaryProps) => {
  const isKanaVocab = subject.object === "kana_vocabulary";

  return (
    <>
      <SubjSummaryRow>
        <SubjectMeanings subject={subject} showPrimaryMeaning={false} />
      </SubjSummaryRow>
      {isKanaVocab ? (
        <SpaceBetweenRow>
          <div>
            <PartsOfSpeech vocab={subject as Vocabulary} />
          </div>
          <AssignmentSrs assignment={assignment} />
        </SpaceBetweenRow>
      ) : (
        <>
          <PartsOfSpeechContainer>
            <PartsOfSpeech vocab={subject as Vocabulary} />
          </PartsOfSpeechContainer>
          <SpaceBetweenRow>
            <VocabReadings vocab={subject as Vocabulary} />
            <AssignmentSrs assignment={assignment} />
          </SpaceBetweenRow>
        </>
      )}
    </>
  );
};

type Props = {
  subject: Subject;
};

function SubjectSummary({ subject }: Props) {
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
      {(subject.object === "vocabulary" ||
        subject.object === "kana_vocabulary") && (
        <VocabSummary subject={subject} assignment={assignment} />
      )}
    </SummaryContainer>
  );
}

export default SubjectSummary;
