import { useState } from "react";
import { useNavigate } from "react-router";
import { setBtnBackground } from "../../services/ImageSrcService";
import { useUserInfoStore } from "../../stores/useUserInfoStore";
import Toast from "../Toast";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components";
import { useLessons } from "../../hooks/useLessons";

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
`;

function LessonsButton() {
  const navigate = useNavigate();
  const [displayToast, setDisplayToast] = useState<boolean>(false);
  const [toastTitle, setToastTitle] = useState<string>();
  const [toastContent, setToastContent] = useState<string>();
  const userInfo = useUserInfoStore.use.userInfo();

  const {
    isLoading: lessonsLoading,
    data: lessonsData,
    error: lessonsErr,
  } = useLessons();

  if (lessonsLoading || lessonsErr) {
    return <LessonButtonSkeleton animated={true}></LessonButtonSkeleton>;
  }

  const onLessonBtnClick = () => {
    let paidSubscription = userInfo && userInfo.subscription.type !== "free";
    if (lessonsData === undefined || lessonsData.length === 0) {
      setToastTitle("No lessons available!");
      setToastContent(
        "Looks like you don't have any lessons right now, work on reviews if you have some available :)"
      );
      setDisplayToast(true);
    } else if (
      userInfo &&
      !paidSubscription &&
      userInfo.level > userInfo.subscription.max_level_granted
    ) {
      setToastTitle("No more free lessons, sorry :(");
      setToastContent("Looks like you've used up all your free lessons!");
      setDisplayToast(true);
    } else {
      navigate("/lessons/settings");
    }
  };

  return (
    <>
      <LessonsButtonStyled
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
      <Toast
        open={displayToast}
        setOpen={setDisplayToast}
        title={toastTitle}
        content={toastContent}
      ></Toast>
    </>
  );
}

export default LessonsButton;
