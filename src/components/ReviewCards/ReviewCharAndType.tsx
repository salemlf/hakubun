import { IonCol, IonRow } from "@ionic/react";
import { SubjectType } from "../../types/Subject";
import {
  getReviewTypeColor,
  getSubjectColor,
  getSubjectTypeDisplayText,
} from "../../services/SubjectAndAssignmentService";
import { SubjectChars } from "../SubjectChars";

import styled from "styled-components/macro";
import { capitalizeWord, getPopoverMsgColor } from "../../services/MiscService";
import {
  PopoverInfo,
  PopoverMessageType,
  ReviewQueueItem,
  ReviewType,
} from "../../types/ReviewSessionTypes";
import { useReviewQueue } from "../../hooks/useReviewQueue";

type ReviewTypeProps = {
  reviewType: ReviewType;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
const ReviewTypeRow = styled(IonRow)<ReviewTypeProps>`
  justify-content: center;
  width: 100%;
  background-color: ${({ reviewType }) => getReviewTypeColor(reviewType)};
  --ion-background-color: ${({ reviewType }) => getReviewTypeColor(reviewType)};

  p {
    font-size: 1.125rem;
    margin: 10px;
  }
`;
const SubjectCharRow = styled(IonRow)`
  position: relative;
  justify-content: center;
  width: 100%;
`;

type MsgWrapperProps = {
  displayMsg: boolean;
};

const MessageWrapper = styled.div<MsgWrapperProps>`
  justify-content: center;
  align-items: center;
  position: absolute;
  display: ${({ displayMsg }) => (displayMsg ? `flex` : `none`)};
  margin: 10px;
  bottom: 0;
`;

type MessageProps = {
  messageType: PopoverMessageType;
};

const Message = styled.span<MessageProps>`
  display: inline-block;
  min-width: 1em;
  padding: 6px;
  border-radius: 15px;
  font-size: 1rem;
  text-align: center;
  background-color: ${({ messageType }) => getPopoverMsgColor(messageType)};
  color: #fefefe;
`;

type ReviewMessageProps = {
  displayMsg: boolean;
  popoverInfo: PopoverInfo;
};

// TODO: change to just merge with ReviewCharAndType component below
const ReviewMessage = ({ displayMsg, popoverInfo }: ReviewMessageProps) => {
  return (
    <MessageWrapper displayMsg={displayMsg}>
      <Message messageType={popoverInfo.messageType}>
        {popoverInfo.message}
      </Message>
    </MessageWrapper>
  );
};

type CharColProps = {
  subjType: SubjectType;
};

const SubjectCharactersCol = styled(IonCol)<CharColProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding-bottom: 50px;
  border-radius: 10px 10px 0px 0px;
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
function ReviewCharAndType({ currentReviewItem }: Props) {
  const { queueState } = useReviewQueue();

  let subjType = currentReviewItem.object as SubjectType;
  let reviewType = currentReviewItem.review_type;
  let reviewTypeCapitalized = capitalizeWord(reviewType);
  let reviewDisplayTxt = getSubjectTypeDisplayText(
    currentReviewItem.object,
    false
  );

  return (
    <>
      <SubjectCharRow>
        <SubjectCharactersCol subjType={subjType}>
          <SubjectChars
            subject={currentReviewItem}
            fontSize="4rem"
            withBgColor={true}
          />
        </SubjectCharactersCol>
        <ReviewMessage
          displayMsg={queueState.displayPopoverMsg}
          popoverInfo={queueState.popoverInfo}
        />
      </SubjectCharRow>
      <ReviewTypeRow reviewType={reviewType}>
        <p>
          {reviewDisplayTxt} {reviewTypeCapitalized}
        </p>
      </ReviewTypeRow>
    </>
  );
}

export default ReviewCharAndType;
