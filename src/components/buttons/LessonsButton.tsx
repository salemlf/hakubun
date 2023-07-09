import { IonButton, IonBadge, IonSkeletonText } from "@ionic/react";
import { useNumLessons } from "../../hooks/useLessonNum";
import { setBtnBackground } from "../../services/ImageSrcService";
import {
  BaseReviewLessonButton,
  BaseReviewLessonButtonSkeleton,
  BaseReviewLessonButtonBadge,
} from "./SubjectButtonsStyled";

import styled from "styled-components/macro";

const LessonsButtonStyled = styled(BaseReviewLessonButton)`
  background-color: var(--wanikani-lesson);
`;

const LessonButtonSkeleton = styled(BaseReviewLessonButtonSkeleton)`
  --background: var(--wani-kani-pink-rgba);
  --background-rgb: var(--wani-kani-pink-rgb);
`;

type Props = {
  level: number;
};

const LessonsButton = ({ level }: Props) => {
  const {
    isLoading: numLessonsLoading,
    data: numLessons,
    error: lessonErr,
  } = useNumLessons({ level: level });

  if (numLessonsLoading || lessonErr) {
    return <LessonButtonSkeleton animated={true}></LessonButtonSkeleton>;
  }

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  return (
    <>
      <LessonsButtonStyled
        color="clear"
        expand="block"
        title="Lessons"
        onClick={goToLessons}
        style={{
          backgroundImage: `url(${
            numLessons
              ? setBtnBackground({ btnType: "lessons", numItems: numLessons })
              : ""
          })`,
        }}
      >
        <p>Lessons</p>
        <BaseReviewLessonButtonBadge>
          {numLessons ? numLessons : 0}
        </BaseReviewLessonButtonBadge>
      </LessonsButtonStyled>
    </>
  );
};

export default LessonsButton;
