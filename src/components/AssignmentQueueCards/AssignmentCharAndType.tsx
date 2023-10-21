import { IonCol, IonRow } from "@ionic/react";
import {
  getSubjectColor,
  getSubjectTypeDisplayText,
} from "../../services/SubjectAndAssignmentService";
import { getReviewTypeColor } from "../../services/AssignmentQueueService";
import { capitalizeWord, getPopoverStyles } from "../../services/MiscService";
import { useQueueStore } from "../../stores/useQueueStore";
import { SubjectType } from "../../types/Subject";
import {
  AssignmentQueueItem,
  ReviewType,
} from "../../types/AssignmentQueueTypes";
import SubjectChars from "../SubjectChars/SubjectChars";
import SvgIcon from "../SvgIcon";
import ReadingIcon from "../../images/reading.svg?react";
import MeaningIcon from "../../images/meaning.svg?react";
import styled from "styled-components";

type AssignmentItemTypeProps = {
  reviewType: ReviewType;
};

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
  alignText: "center" | "left";
};

const SubjectCharactersCol = styled(IonCol)<CharColProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  padding-bottom: 50px;
  border-radius: 10px 10px 0px 0px;
  text-align: ${({ alignText }) => alignText};
`;

export const AssignmentTypeHeadingSvgContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  gap: 5px;
`;

const AssignmentTypeHeading = styled.h5`
  font-size: 1rem;
  margin: 4px 0 4px;
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

  // TODO: Not an ideal fix, so do padding/margin bottom and input focus fix later
  // Decreasing font size for vocab to avoid keyboard hidding input
  let charFontSize =
    subjType === "vocabulary" || subjType === "kana_vocabulary"
      ? "3rem"
      : "4rem";

  return (
    <>
      <SubjectCharRow>
        <SubjectCharactersCol subjType={subjType} alignText="center">
          <SubjectChars
            disableTextSelection={disableTextSelection}
            subject={currentReviewItem}
            fontSize={charFontSize}
            withBgColor={true}
            alignText="center"
          />
        </SubjectCharactersCol>
        <MessageWrapper displayMsg={displayPopoverMsg}>
          <Message
            fontcolor={popoverStyles.fontColor}
            bgcolor={popoverStyles.bgColor}
          >
            {popoverInfo.message}
          </Message>
        </MessageWrapper>
      </SubjectCharRow>
      <AssignmentTypeRow reviewType={reviewType}>
        <AssignmentTypeHeadingSvgContainer>
          {reviewType === "meaning" ? (
            <SvgIcon icon={<MeaningIcon />} width="1.75em" height="1.75em" />
          ) : (
            <SvgIcon icon={<ReadingIcon />} width="1.75em" height="1.75em" />
          )}
          <AssignmentTypeHeading>
            {reviewDisplayTxt} {reviewTypeCapitalized}
          </AssignmentTypeHeading>
        </AssignmentTypeHeadingSvgContainer>
      </AssignmentTypeRow>
    </>
  );
}

export default AssignmentCharAndType;
