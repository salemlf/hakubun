import { useHistory, useLocation } from "react-router";
// import { useHistory, useParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { IonContent, IonGrid, IonPage } from "@ionic/react";

import { useSubjectByID } from "../hooks/useSubjectByID";

import { SubjectSummary } from "../components/subject-details/SubjectSummary";
import { RadicalSubjDetails } from "../components/subject-details/RadicalSubjDetails";
import { KanjiSubjDetails } from "../components/subject-details/KanjiSubjDetails";
import { VocabSubjDetails } from "../components/subject-details/VocabSubjDetails";
import { SubjectHeader } from "../components/subject-details/SubjectHeader";

import styles from "./SubjectDetails.module.scss";
import styled from "styled-components/macro";
import { Kanji, Radical, Vocabulary } from "../types/Subject";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);

  // TODO: use useHistory or useLocation to get state/type of subject

  // TODO: display skeleton while loading
  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(parsedID);

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
            <VocabSubjDetails vocab={subject as Vocabulary} />
          )}
        </IonGrid>
      </IonContent>
    </Page>
  );
};
