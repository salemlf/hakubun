import { useHistory, useLocation } from "react-router";
// import { useHistory, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IonContent, IonGrid, IonCol, IonRow, IonPage } from "@ionic/react";

import { useSubjectByID } from "../hooks/useSubjectByID";
import { useAssignmentBySubjID } from "../hooks/useAssignmentBySubjID";

import { SubjectSummary } from "../components/subject-details/SubjectSummary";
import { SubjInfoContainer } from "../components/subject-details/SubjectDetailsStyled";
import { RadicalSubjDetails } from "../components/cards/RadicalSubjDetails";
import { KanjiSubjDetails } from "../components/subject-details/KanjiSubjDetails";
import { SubjectHeader } from "../components/subject-details/SubjectHeader";

import styles from "./SubjectDetails.module.scss";
import styled from "styled-components/macro";
import { Kanji, Radical } from "../types/Subject";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);

  // TODO: use useHistory or useLocation to get state/type of subject

  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(parsedID);

  const {
    isLoading: assignmentLoading,
    data: assignment,
    error: assignmentErr,
  } = useAssignmentBySubjID([parsedID]);

  let locked =
    subject !== undefined && !assignmentLoading && assignment === undefined;

  // TODO: use SubjInfoContainer for kanji and vocab
  return (
    <Page>
      {subject && <SubjectHeader subject={subject} />}
      <IonContent>
        <IonGrid className={`${styles.fullWidthGrid}`}>
          {subject && <SubjectSummary subject={subject}></SubjectSummary>}
          {/* TODO: add cases for kanji and vocab too */}
          {subject && subject?.object == "radical" && (
            <RadicalSubjDetails radical={subject as Radical} />
          )}
          {subject && subject?.object == "kanji" && (
            <KanjiSubjDetails kanji={subject as Kanji} />
          )}
          {subject && subject?.object == "vocabulary" && (
            <SubjInfoContainer>
              <div>
                <h3>Context Sentences</h3>
                <p>...</p>
              </div>
              <div>
                <h3>Meaning Explanation</h3>
                <p>...</p>
              </div>
            </SubjInfoContainer>
          )}
        </IonGrid>
      </IonContent>
    </Page>
  );
};
