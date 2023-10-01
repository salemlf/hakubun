import { IonCol, IonRow } from "@ionic/react";
import {
  getSubjectColor,
  getSubjectTypeDisplayText,
} from "../../services/SubjectAndAssignmentService";
import { getReviewTypeColor } from "../../services/AssignmentQueueService";
import { capitalizeWord, getPopoverStyles } from "../../services/MiscService";
import { SubjectType } from "../../types/Subject";
import {
  AssignmentQueueItem,
  ReviewType,
} from "../../types/AssignmentQueueTypes";
import SubjectChars from "../SubjectChars/SubjectChars";
import styled from "styled-components";
import { useQueueStore } from "../../stores/useQueueStore";

type AssignmentItemTypeProps = {
  reviewType: ReviewType;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
const AssignmentTypeRow = styled(IonRow)<AssignmentItemTypeProps>`
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
  bgcolor: string;
  fontcolor: string;
};

const Message = styled.span<MessageProps>`
  display: inline-block;
  min-width: 1em;
  padding: 6px;
  border-radius: 15px;
  font-size: 1rem;
  text-align: center;
  background-color: ${({ bgcolor }) => bgcolor};
  color: ${({ fontcolor }) => fontcolor};
`;

type CharColProps = {
  subjType: SubjectType;
};

const SubjectCharactersCol = styled(IonCol)<CharColProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding-bottom: 50px;
  border-radius: 10px 10px 0px 0px;
`;

type Props = {
  currentReviewItem: AssignmentQueueItem;
  disableTextSelection?: boolean;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord
function AssignmentCharAndType({
  currentReviewItem,
  disableTextSelection = false,
}: Props) {
  const displayPopoverMsg = useQueueStore.use.displayPopoverMsg();
  const popoverInfo = useQueueStore.use.popoverInfo();

  let popoverStyles = getPopoverStyles(popoverInfo.messageType);

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
            disableTextSelection={disableTextSelection}
            subject={currentReviewItem}
            fontSize="4rem"
            withBgColor={true}
            alignText="center"
          />
        </SubjectCharactersCol>
        <MessageWrapper displayMsg={displayPopoverMsg}>
          {/* <Message messageType={popoverInfo.messageType}> */}
          <Message
            fontcolor={popoverStyles.fontColor}
            bgcolor={popoverStyles.bgColor}
          >
            {popoverInfo.message}
          </Message>
        </MessageWrapper>
      </SubjectCharRow>
      <AssignmentTypeRow reviewType={reviewType}>
        <p>
          {reviewDisplayTxt} {reviewTypeCapitalized}
        </p>
      </AssignmentTypeRow>
    </>
  );
}

export default AssignmentCharAndType;
