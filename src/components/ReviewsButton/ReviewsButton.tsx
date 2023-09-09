import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setBtnBackground } from "../../services/ImageSrcService";
import { useNumReviews } from "../../hooks/useNumReviews";
import Toast from "../Toast/Toast";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components";

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

// TODO: change so getting reviews and then just use number of those for count
function ReviewsButton({ level }: Props) {
  const navigate = useNavigate();
  const [displayToast, setDisplayToast] = useState<boolean>(false);

  const {
    isLoading: numReviewsLoading,
    data: numReviews,
    error: reviewErr,
  } = useNumReviews(level);

  if (numReviewsLoading || reviewErr) {
    return <ReviewsButtonSkeleton animated={true}></ReviewsButtonSkeleton>;
  }

  const onReviewBtnClick = () => {
    if (numReviews === 0 || numReviews === undefined) {
      setDisplayToast(true);
    } else {
      navigate("/reviews/settings");
    }
  };

  // TODO: delay loading until image is set
  return (
    <>
      <ReviewsButtonStyled
        expand="block"
        title="Reviews"
        color="clear"
        onClick={onReviewBtnClick}
        style={{
          backgroundImage: `url(${setBtnBackground({
            btnType: "reviews",
            numItems: numReviews,
          })})`,
        }}
      >
        <p>Reviews</p>
        <BaseReviewLessonButtonBadge>
          {numReviews ? numReviews : 0}
        </BaseReviewLessonButtonBadge>
      </ReviewsButtonStyled>
      <Toast
        open={displayToast}
        setOpen={setDisplayToast}
        title="No reviews available!"
        content="Looks like you don't have any reviews right now, come back later!"
      ></Toast>
    </>
  );
}

export default ReviewsButton;
