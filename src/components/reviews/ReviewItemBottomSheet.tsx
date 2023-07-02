import { useRef, useState } from "react";
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { useReviewQueue } from "../../hooks/useReviewQueue";
import { ReviewQueueItem, ReviewType } from "../../types/ReviewSessionTypes";
import { SubjectHeader } from "../subject-details/SubjectHeader";
import {
  Kanji,
  Radical,
  Subject,
  SubjectType,
  Vocabulary,
} from "../../types/Subject";

import styled from "styled-components/macro";
import { RadicalSubjDetails } from "../subject-details/RadicalSubjDetails";
import { VocabSubjDetails } from "../subject-details/VocabSubjDetails";
import { RadicalCombination } from "../RadicalCombination";
import { SubjectMeanings } from "../SubjectMeanings";
import { KanjiMeaningMnemonic } from "../KanjiMeaningMnemonic";

type Props = {
  currentReviewItem: ReviewQueueItem;
  reviewType: ReviewType;
};

const FullWidthGrid = styled(IonGrid)`
  margin: 0;
  padding: 0;
`;

const Title = styled(IonTitle)`
  text-align: center;
`;

const Toolbar = styled(IonToolbar)`
  &:first-of-type {
    padding-top: 8px;
  }
  padding-bottom: 8px;
`;

type BottomSheetSubjectProps = {
  reviewItem: ReviewQueueItem;
  selectedSegment: ReviewType | string;
};

// TODO: add meaning mnemonics
const RadicalBottomSheet = ({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) => {
  return (
    <>
      {selectedSegment === "meaning" && (
        <>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
        </>
      )}
    </>
  );
};

const KanjiBottomSheet = ({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) => {
  return (
    <>
      {selectedSegment === "radicals" && (
        <RadicalCombination kanji={reviewItem as Kanji} />
      )}
      {selectedSegment === "meaning" && (
        <>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
          <KanjiMeaningMnemonic kanji={reviewItem as Kanji} />
        </>
      )}
    </>
  );
};

// TODO: add meaning mnemonics
const VocabBottomSheet = ({
  reviewItem,
  selectedSegment,
}: BottomSheetSubjectProps) => {
  return (
    <>
      {selectedSegment === "meaning" && (
        <>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
        </>
      )}
    </>
  );
};

// TODO: fix issue where this isn't always closed after moving to other pages
export const ReviewItemBottomSheet = ({
  currentReviewItem,
  reviewType,
}: Props) => {
  const { queueState } = useReviewQueue();
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedSegment, setSelectedSegment] = useState<ReviewType | string>(
    reviewType
  );
  const subjectsWithReadings: SubjectType[] = ["kanji", "vocabulary"];

  let isBottomSheetVisible = queueState.isBottomSheetVisible;
  // *testing
  console.log(
    "🚀 ~ file: ReviewItemBottomSheet.tsx:18 ~ ReviewItemBottomSheet ~ isBottomSheetVisible:",
    isBottomSheetVisible
  );
  // *testing

  // TODO: change type to click event
  const onSegmentClick = (e: any) => {
    const segmentClicked = e.target.value;
    if (segmentClicked === selectedSegment) {
      // TODO: refresh the data, rn does nothing
    } else {
      setSelectedSegment(segmentClicked);
    }
  };

  return (
    <IonModal
      ref={modal}
      isOpen={isBottomSheetVisible}
      initialBreakpoint={0.08}
      breakpoints={[0.08, 1]}
      handleBehavior="cycle"
      backdropDismiss={false}
      backdropBreakpoint={0.5}
    >
      <IonHeader>
        <Toolbar>
          <Title>Subject Info</Title>
        </Toolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <>
          <SubjectHeader subject={currentReviewItem as Subject} />
          <IonContent>
            <FullWidthGrid>
              <IonSegment value={selectedSegment} onClick={onSegmentClick}>
                {currentReviewItem.object == "kanji" && (
                  <IonSegmentButton value="radicals">
                    <IonLabel>Radicals</IonLabel>
                  </IonSegmentButton>
                )}
                {currentReviewItem.object == "vocabulary" && (
                  <IonSegmentButton value="kanji">
                    <IonLabel>Kanji</IonLabel>
                  </IonSegmentButton>
                )}
                <IonSegmentButton value="meaning">
                  <IonLabel>Meaning</IonLabel>
                </IonSegmentButton>
                {subjectsWithReadings.includes(currentReviewItem.object) && (
                  <IonSegmentButton value="reading">
                    <IonLabel>Reading</IonLabel>
                  </IonSegmentButton>
                )}
              </IonSegment>
              {currentReviewItem.object == "radical" && (
                // <RadicalSubjDetails radical={currentReviewItem as Radical} />
                <RadicalBottomSheet
                  reviewItem={currentReviewItem}
                  selectedSegment={selectedSegment}
                />
              )}
              {currentReviewItem.object == "kanji" && (
                <KanjiBottomSheet
                  reviewItem={currentReviewItem}
                  selectedSegment={selectedSegment}
                />
              )}
              {/* // TODO: create a version of this for kana vocab */}
              {currentReviewItem.object == "vocabulary" && (
                // <VocabSubjDetails vocab={currentReviewItem as Vocabulary} />
                <VocabBottomSheet
                  reviewItem={currentReviewItem}
                  selectedSegment={selectedSegment}
                />
              )}
            </FullWidthGrid>
          </IonContent>
        </>
      </IonContent>
    </IonModal>
  );
};
