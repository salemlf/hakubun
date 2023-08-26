import { useParams } from "react-router-dom";
import { IonGrid, IonSkeletonText } from "@ionic/react";
import { AnimatePresence } from "framer-motion";
import { useSubjectByID } from "../hooks/useSubjectByID";
import { useTabBarVisibility } from "../hooks/useTabBarVisibility";
import { GeneralVocabulary, Kanji, Radical } from "../types/Subject";
import SubjectSummary from "../components/SubjectSummary/SubjectSummary";
import RadicalSubjDetails from "../components/RadicalSubjDetails/RadicalSubjDetails";
import KanjiSubjDetails from "../components/KanjiSubjDetails/KanjiSubjDetails";
import VocabSubjDetails from "../components/VocabSubjDetails/VocabSubjDetails";
import SubjectHeader from "../components/SubjectHeader/SubjectHeader";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import { ContentWithTabBar } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const FullWidthGrid = styled(IonGrid)`
  margin-left: 0;
  margin-right: 0;
  padding-left: 0;
  padding-right: 0;
`;

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

// TODO: show "back to review" button if routed to this page from a assignment session
export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);
  const isTabBarVisible = useTabBarVisibility();

  const {
    isLoading: subjectLoading,
    data: subject,
    error: subjectErr,
  } = useSubjectByID(parsedID);

  // TODO: display loading skeleton for each component until all content on page is loaded
  return (
    <>
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
      <AnimatePresence>{isTabBarVisible && <FloatingTabBar />}</AnimatePresence>
    </>
  );
};
