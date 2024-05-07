import { useNavigate } from "react-router-dom";
import { setBtnBackground } from "../../services/ImageSrcService/ImageSrcService";
import { displayToast } from "../Toast/Toast.service";
import { useReviews } from "../../hooks/assignments/useReviews";
import ErrorMessage from "../ErrorMessage";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonContainer,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components";

const ReviewsButtonSkeleton = styled(BaseReviewLessonButtonSkeleton)`
  --background: var(--wanikani-blue-rgba);
  --background-rgb: var(--wanikani-blue-rgb);
  background-color: var(--wanikani-blue-rgb);
  border: 2px solid black;
`;

const ReviewButtonErrContainer = styled(BaseReviewLessonButtonContainer)`
  background-color: var(--wanikani-blue);
  border: 2px solid black;
`;

function ReviewsButton() {
  const navigate = useNavigate();

  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useReviews();

  const onReviewBtnClick = () => {
    if (availForReviewData === undefined || availForReviewData.length === 0) {
      displayToast({
        title: "No reviews available!",
        content:
          "Looks like you don't have any reviews right now, come back later!",
        toastType: "error",
        timeout: 10000,
      });
    } else {
      navigate("/reviews/settings");
    }
  };

  if (availForReviewErr && !availForReviewData) {
    return (
      <ReviewButtonErrContainer disabled={true} data-testid="review-btn-err">
        <ErrorMessage />
      </ReviewButtonErrContainer>
    );
  }

  if (availForReviewLoading) {
    return <ReviewsButtonSkeleton animated={true}></ReviewsButtonSkeleton>;
  }

  // TODO: delay loading until image is set
  return (
    <>
      <BaseReviewLessonButton
        backgroundColor="var(--wanikani-review)"
        aria-label="Reviews"
        onPress={onReviewBtnClick}
        style={{
          backgroundImage: `url(${setBtnBackground({
            btnType: "reviews",
            numItems: availForReviewData ? availForReviewData.length : 0,
          })})`,
        }}
      >
        <p>Reviews</p>
        <BaseReviewLessonButtonBadge>
          {availForReviewData ? availForReviewData.length : 0}
        </BaseReviewLessonButtonBadge>
      </BaseReviewLessonButton>
    </>
  );
}

export default ReviewsButton;
