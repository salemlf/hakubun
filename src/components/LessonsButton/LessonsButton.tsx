import { useNavigate } from "react-router";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { setBtnBackground } from "../../services/ImageSrcService";
import { displayToast } from "../Toast/Toast.service";
import { useLessons } from "../../hooks/useLessons";
import ErrorMessage from "../ErrorMessage";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonContainer,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components";

const LessonsButtonStyled = styled(BaseReviewLessonButton)`
  background-color: var(--wanikani-lesson);
  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

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
      <LessonButtonErrContainer disabled={true}>
        <ErrorMessage />
      </LessonButtonErrContainer>
    );
  }

  const onLessonBtnClick = () => {
    let paidSubscription = userInfo && userInfo.subscription.type !== "free";
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
      navigate("/lessons/settings");
    }
  };

  return (
    <>
      <LessonsButtonStyled
        aria-label="Lessons"
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
      </LessonsButtonStyled>
    </>
  );
}

export default LessonsButton;
