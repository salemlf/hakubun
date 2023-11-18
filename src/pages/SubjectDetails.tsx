import { useParams } from "react-router-dom";
import { IonSkeletonText } from "@ionic/react";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { useSubjectByID } from "../hooks/useSubjectByID";
import { GeneralVocabulary, Kanji, Radical } from "../types/Subject";
import SubjectSummary from "../components/SubjectSummary/SubjectSummary";
import RadicalSubjDetails from "../components/RadicalSubjDetails/RadicalSubjDetails";
import KanjiSubjDetails from "../components/KanjiSubjDetails/KanjiSubjDetails";
import VocabSubjDetails from "../components/VocabSubjDetails/VocabSubjDetails";
import SubjectHeader from "../components/SubjectHeader/SubjectHeader";
import ErrorMessage from "../components/ErrorMessage";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const FullWidthGrid = styled.section`
  padding: 5px 0;
  margin: 0;
`;

// TODO: sometimes has isSessionInProgress as true when it should be false, investigate
export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);

  const { sessionInProgress: isSessionInProgress } =
    useAssignmentQueueStoreFacade();
  console.log(
    "🚀 ~ file: SubjectDetails.tsx:34 ~ SubjectDetails ~ isSessionInProgress:",
    isSessionInProgress
  );

  const {
    isLoading: subjectLoading,
    data: subjectData,
    error: subjectErr,
  } = useSubjectByID(parsedID);

  // TODO: display loading skeleton for each component until all content on page is loaded
  if (subjectLoading) {
    return (
      <ContentWithTabBar>
        <IonSkeletonText
          animated={true}
          style={{ height: "75vh" }}
        ></IonSkeletonText>
      </ContentWithTabBar>
    );
  }

  if (subjectErr && !subjectData) {
    <ContentWithTabBar>
      <ErrorMessage />
    </ContentWithTabBar>;
  }

  return (
    <>
      {subjectData && (
        <>
          <SubjectHeader subject={subjectData} />
          <ContentWithTabBar>
            <FullWidthGrid>
              <SubjectSummary subject={subjectData}></SubjectSummary>
              {subjectData.object == "radical" && (
                <RadicalSubjDetails radical={subjectData as Radical} />
              )}
              {subjectData.object == "kanji" && (
                <KanjiSubjDetails kanji={subjectData as Kanji} />
              )}
              {(subjectData.object == "vocabulary" ||
                subjectData.object == "kana_vocabulary") && (
                <VocabSubjDetails vocab={subjectData as GeneralVocabulary} />
              )}
            </FullWidthGrid>
          </ContentWithTabBar>
        </>
      )}
    </>
  );
};
