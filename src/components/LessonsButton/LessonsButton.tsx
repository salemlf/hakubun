import { useNavigate } from "@tanstack/react-router";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { setBtnBackground } from "../../services/ImageSrcService/ImageSrcService";
import { displayToast } from "../Toast/Toast.service";
import { useLessons } from "../../hooks/assignments/useLessons";
import ErrorMessage from "../ErrorMessage";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonContainer,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components";

const LessonButtonSkeleton = styled(BaseReviewLessonButtonSkeleton)`
  --background: var(--wani-kani-pink-rgba);
  --background-rgb: var(--wani-kani-pink-rgb);
  border: 2px solid black;
`;

const LessonButtonErrContainer = styled(BaseReviewLessonButtonContainer)`
  background-color: var(--wanikani-pink);
  border: 2px solid black;
`;

function LessonsButton() {
  const navigate = useNavigate();
  const { userInfo } = useUserInfoStoreFacade();

  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();

  if (lessonsLoading) {
    return <LessonButtonSkeleton animated={true}></LessonButtonSkeleton>;
  }

  if (lessonsErr && !lessonsData) {
    return (
      <LessonButtonErrContainer disabled={true} data-testid="lesson-btn-err">
        <ErrorMessage />
      </LessonButtonErrContainer>
    );
  }

  const onLessonBtnClick = () => {
    const paidSubscription = userInfo && userInfo.subscription.type !== "free";
    if (lessonsData === undefined || lessonsData.length === 0) {
      displayToast({
        title: "No lessons available!",
        content:
          "Looks like you don't have any lessons right now, work on reviews if you have some available :)",
        toastType: "error",
        timeout: 10000,
      });
    } else if (
      userInfo &&
      !paidSubscription &&
      userInfo.level > userInfo.subscription.max_level_granted
    ) {
      displayToast({
        title: "No more free lessons, sorry :(",
        content: "Looks like you've used up all your free lessons!",
        toastType: "error",
        timeout: 10000,
      });
    } else {
      navigate({ to: "/lessons/settings" });
    }
  };

  return (
    <>
      <BaseReviewLessonButton
        backgroundColor="var(--wanikani-lesson)"
        aria-label="Lessons"
        className="base-button"
        onPress={onLessonBtnClick}
        style={{
          backgroundImage: `url(${setBtnBackground({
            btnType: "lessons",
            numItems: lessonsData ? lessonsData.length : 0,
          })})`,
        }}
      >
        <p>Lessons</p>
        <BaseReviewLessonButtonBadge>
          {lessonsData ? lessonsData.length : 0}
        </BaseReviewLessonButtonBadge>
      </BaseReviewLessonButton>
    </>
  );
}

export default LessonsButton;
