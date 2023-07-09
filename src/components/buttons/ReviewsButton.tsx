import { useNumReviews } from "../../hooks/useNumReviews";
import { setBtnBackground } from "../../services/ImageSrcService";
import { useIonRouter } from "@ionic/react";

import styled from "styled-components/macro";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonSkeleton,
  BaseReviewLessonButtonBadge,
} from "./SubjectButtonsStyled";

const ReviewsButtonStyled = styled(BaseReviewLessonButton)`
  background-color: var(--wanikani-review);
`;

const ReviewsButtonSkeleton = styled(BaseReviewLessonButtonSkeleton)`
  --background: var(--wanikani-blue-rgba);
  --background-rgb: var(--wanikani-blue-rgb);
`;

type Props = {
  level: number | undefined;
};

// TODO: check if review is currently in session (reviewQueue length !==0), then ask user if they want to resume if it exists
const ReviewsButton = ({ level }: Props) => {
  const router = useIonRouter();

  const {
    isLoading: numReviewsLoading,
    data: numReviews,
    error: reviewErr,
  } = useNumReviews(level);

  if (numReviewsLoading || reviewErr) {
    return <ReviewsButtonSkeleton animated={true}></ReviewsButtonSkeleton>;
  }

  // TODO: delay loading until image is set
  return (
    <ReviewsButtonStyled
      expand="block"
      title="Reviews"
      color="clear"
      // TODO: change so if no reviews -> doesn't redirect and displays a message
      onClick={() => router.push("/review/settings")}
      style={{
        backgroundImage: `url(${
          numReviews
            ? setBtnBackground({ btnType: "reviews", numItems: numReviews })
            : ""
        })`,
      }}
    >
      <p>Reviews</p>
      <BaseReviewLessonButtonBadge>
        {numReviews ? numReviews : 0}
      </BaseReviewLessonButtonBadge>
    </ReviewsButtonStyled>
  );
};

export default ReviewsButton;
