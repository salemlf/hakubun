import { useParams } from "react-router-dom";
import {
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSkeletonText,
} from "@ionic/react";

import { useSubjectByID } from "../hooks/useSubjectByID";

import SubjectSummary from "../components/SubjectSummary/SubjectSummary";
import RadicalSubjDetails from "../components/RadicalSubjDetails/RadicalSubjDetails";
import KanjiSubjDetails from "../components/KanjiSubjDetails/KanjiSubjDetails";
import VocabSubjDetails from "../components/VocabSubjDetails/VocabSubjDetails";
import SubjectHeader from "../components/SubjectHeader/SubjectHeader";

import styles from "./SubjectDetails.module.scss";
import styled from "styled-components/macro";
import { Kanji, Radical, Vocabulary } from "../types/Subject";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import FloatingTabBar from "../components/FloatingTabBar";

const Page = styled(IonPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);

  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(parsedID);

  // TODO: display loading skeleton for each component until all content on page is loaded
  return (
    <Page>
      {subjectLoading ? (
        <ContentWithTabBar>
          <IonSkeletonText
            animated={true}
            style={{ height: "50px" }}
          ></IonSkeletonText>
        </ContentWithTabBar>
      ) : (
        <>
          {subject && <SubjectHeader subject={subject} />}
          <ContentWithTabBar>
            <IonGrid className={`${styles.fullWidthGrid}`}>
              {subject && <SubjectSummary subject={subject}></SubjectSummary>}
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
          </ContentWithTabBar>
        </>
      )}
      <FloatingTabBar />
    </Page>
  );
};
