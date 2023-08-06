import { setBtnBackground } from "../../services/ImageSrcService";
import { useNumReviews } from "../../hooks/useNumReviews";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components/macro";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const ReviewsButtonStyled = styled(BaseReviewLessonButton)`
  background-color: var(--wanikani-review);
  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

const ReviewsButtonSkeleton = styled(BaseReviewLessonButtonSkeleton)`
  --background: var(--wanikani-blue-rgba);
  --background-rgb: var(--wanikani-blue-rgb);
`;

type Props = {
  level: number | undefined;
};

function ReviewsButton({ level }: Props) {
  const history = useHistory();

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
      onClick={() => history.push("/review/settings")}
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
}

export default ReviewsButton;
