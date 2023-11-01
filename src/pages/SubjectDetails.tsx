import { useParams } from "react-router-dom";
import { IonGrid, IonSkeletonText } from "@ionic/react";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { useSubjectByID } from "../hooks/useSubjectByID";
import { GeneralVocabulary, Kanji, Radical } from "../types/Subject";
import SubjectSummary from "../components/SubjectSummary/SubjectSummary";
import RadicalSubjDetails from "../components/RadicalSubjDetails/RadicalSubjDetails";
import KanjiSubjDetails from "../components/KanjiSubjDetails/KanjiSubjDetails";
import VocabSubjDetails from "../components/VocabSubjDetails/VocabSubjDetails";
import SubjectHeader from "../components/SubjectHeader/SubjectHeader";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const FullWidthGrid = styled(IonGrid)`
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
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
            style={{ height: "75vh" }}
          ></IonSkeletonText>
        </ContentWithTabBar>
      ) : (
        <>
          {subject && (
            <>
              <SubjectHeader subject={subject} />
              <ContentWithTabBar>
                <FullWidthGrid>
                  <SubjectSummary subject={subject}></SubjectSummary>
                  {subject.object == "radical" && (
                    <RadicalSubjDetails radical={subject as Radical} />
                  )}
                  {subject.object == "kanji" && (
                    <KanjiSubjDetails kanji={subject as Kanji} />
                  )}
                  {(subject.object == "vocabulary" ||
                    subject.object == "kana_vocabulary") && (
                    <VocabSubjDetails vocab={subject as GeneralVocabulary} />
                  )}
                </FullWidthGrid>
              </ContentWithTabBar>
            </>
          )}
        </>
      )}
    </Page>
  );
};
