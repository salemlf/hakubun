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

const ReviewTypeRow = styled(IonRow)<ReviewTypeProps>`
  justify-content: center;
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
`;

type MsgWrapperProps = {
  displayMsg: boolean;
};

const MessageWrapper = styled.div<MsgWrapperProps>`
  justify-content: center;
  align-items: center;
  position: absolute;
  display: ${({ displayMsg }) => (displayMsg ? `flex` : `none`)};
  bottom: 1rem;
`;

type MessageProps = {
  messageType: PopoverMessageType;
};

const Message = styled.span<MessageProps>`
  display: inline-block;
  min-width: 1em;
  padding: 10px;
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
  cardStyle: boolean;
};

const SubjectCharactersCol = styled(IonCol)<CharColProps>`
  padding: 65px 0 65px;
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  border-radius: ${({ cardStyle }) => (cardStyle ? "10px 10px 0 0" : "0")};
`;

type Props = {
  currentReviewItem: ReviewQueueItem;
  cardStyle?: boolean;
};

export const ReviewCharAndType = ({
  currentReviewItem,
  cardStyle = false,
}: Props) => {
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
        <SubjectCharactersCol subjType={subjType} cardStyle={cardStyle}>
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
};
