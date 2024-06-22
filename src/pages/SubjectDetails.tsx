import { useNavigate, useParams } from "react-router-dom";
import { IonSkeletonText } from "@ionic/react";
import { AnimatePresence } from "framer-motion";
import { useScrollRestoration } from "use-scroll-restoration";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { capitalizeWord } from "../services/MiscService/MiscService";
import { useSubjectByID } from "../hooks/subjects/useSubjectByID";
import { GeneralVocabulary, Kanji, Radical } from "../types/Subject";
import { AssignmentSessionType } from "../types/AssignmentQueueTypes";
import SubjectSummary from "../components/SubjectSummary/SubjectSummary";
import RadicalSubjDetails from "../components/RadicalSubjDetails/RadicalSubjDetails";
import KanjiSubjDetails from "../components/KanjiSubjDetails/KanjiSubjDetails";
import VocabSubjDetails from "../components/VocabSubjDetails/VocabSubjDetails";
import SubjectHeader from "../components/SubjectHeader/SubjectHeader";
import ErrorMessage from "../components/ErrorMessage";
import SvgIcon from "../components/SvgIcon";
import {
  ContentWithTabBar,
  FloatingButton,
  FloatingButtonContainer,
} from "../styles/BaseStyledComponents";
import BackArrowIcon from "../images/back-arrow.svg?react";
import styled from "styled-components";

const BackToSessionTxt = styled.p`
  margin: 0;
  color: black;
  font-size: 1rem;
`;

type BackToSessionBtnProps = {
  sessionType: AssignmentSessionType;
};

function BackToSessionBtn({ sessionType }: BackToSessionBtnProps) {
  const navigate = useNavigate();

  return (
    <FloatingButtonContainer
      distancefrombottom={"35px"}
      transition={{ type: "spring", delay: 0.5 }}
      initial={{ scale: 0, x: "-50%" }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
    >
      <FloatingButton
        backgroundColor="var(--ion-color-tertiary)"
        color="black"
        onPress={() => navigate(-1)}
      >
        <SvgIcon icon={<BackArrowIcon />} width="1em" height="1em" />
        <BackToSessionTxt>
          Back to {capitalizeWord(sessionType)}s
        </BackToSessionTxt>
      </FloatingButton>
    </FloatingButtonContainer>
  );
}

const FullWidthGrid = styled.section`
  padding: 5px 0;
  margin: 0;
`;

// TODO: sometimes has isSessionInProgress as true when it should be false, investigate
export const SubjectDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const parsedID = parseInt(id!);

  const { ref } = useScrollRestoration(`subjectDetailsPageScroll${id}`, {
    debounceTime: 200,
    persist: "localStorage",
  });

  const { sessionInProgress: isSessionInProgress, sessionType } =
    useAssignmentQueueStoreFacade();

  const {
    isLoading: subjectLoading,
    data: subjectData,
    error: subjectErr,
  } = useSubjectByID(parsedID);

  // TODO: display loading skeleton for each component until all content on page is loaded
  if (subjectLoading) {
    return (
      <ContentWithTabBar data-testid="subject-details-page">
        <IonSkeletonText
          animated={true}
          style={{ height: "75vh" }}
        ></IonSkeletonText>
      </ContentWithTabBar>
    );
  }

  if (subjectErr && !subjectData) {
    <ContentWithTabBar data-testid="subject-details-page">
      <ErrorMessage />
    </ContentWithTabBar>;
  }

  return (
    <>
      {subjectData && (
        <>
          <SubjectHeader subject={subjectData} />
          <ContentWithTabBar data-testid="subject-details-page" ref={ref}>
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
          <AnimatePresence>
            {isSessionInProgress && (
              <BackToSessionBtn sessionType={sessionType} />
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};
