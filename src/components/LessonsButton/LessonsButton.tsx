import { useState } from "react";
import { useNavigate } from "react-router";
import { useNumLessons } from "../../hooks/useLessonNum";
import { useAuth } from "../../hooks/useAuth";
import { setBtnBackground } from "../../services/ImageSrcService";
import Toast from "../Toast";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonBadge,
  BaseReviewLessonButtonSkeleton,
} from "../../styles/SubjectButtonsStyled";
import styled from "styled-components";

const LessonsButtonStyled = styled(BaseReviewLessonButton)`
  background-color: var(--wanikani-lesson);
  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

const LessonButtonSkeleton = styled(BaseReviewLessonButtonSkeleton)`
  --background: var(--wani-kani-pink-rgba);
  --background-rgb: var(--wani-kani-pink-rgb);
`;

type Props = {
  level: number;
};

function LessonsButton({ level }: Props) {
  const navigate = useNavigate();
  const [displayToast, setDisplayToast] = useState<boolean>(false);
  const [toastTitle, setToastTitle] = useState<string>();
  const [toastContent, setToastContent] = useState<string>();
  const { user } = useAuth();

  // TODO: change so getting lessons and then just use number of those for count
  const {
    isLoading: numLessonsLoading,
    data: numLessons,
    error: lessonErr,
  } = useNumLessons({ level: level });

  if (numLessonsLoading || lessonErr) {
    return <LessonButtonSkeleton animated={true}></LessonButtonSkeleton>;
  }

  const onLessonBtnClick = () => {
    let paidSubscription = user && user.subscription.type !== "free";
    if (numLessons === 0 || numLessons === undefined) {
      setToastTitle("No lessons available!");
      setToastContent(
        "Looks like you don't have any lessons right now, work on reviews if you have some available :)"
      );
      setDisplayToast(true);
    }
    // trial user
    else if (
      user &&
      !paidSubscription &&
      user.level > user.subscription.max_level_granted
    ) {
      setToastTitle("No more free lessons, sorry :(");
      setToastContent("Looks like you've used up all your free lessons!");
      setDisplayToast(true);

      console.log("No paid subscription");
      console.log("user: ", user);
    } else {
      navigate("/lessons/settings");
    }
  };

  return (
    <>
      <LessonsButtonStyled
        color="clear"
        expand="block"
        title="Lessons"
        onClick={onLessonBtnClick}
        style={{
          backgroundImage: `url(${setBtnBackground({
            btnType: "lessons",
            numItems: numLessons,
          })})`,
        }}
      >
        <p>Lessons</p>
        <BaseReviewLessonButtonBadge>
          {numLessons ? numLessons : 0}
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
