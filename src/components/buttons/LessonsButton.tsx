import { IonButton, IonBadge, IonSkeletonText } from "@ionic/react";

import { useLessons } from "../../hooks/useLessons";

import { getLessonBgByKey } from "../../services/ImageSrcService";

import styles from "./LessonsButton.module.scss";

type Props = {
  level: number;
};

const lessonBtnImages = [0, 24, 49, 99, 249, 499, 500];
const maxedOut = lessonBtnImages.at(-1);

// TODO: combine component with Reviews Button?
const LessonsButton = ({ level }: Props) => {
  const {
    isLoading: lessonsLoading,
    data: lessonData,
    error: lessonErr,
  } = useLessons({ level: level });

  const setBgImgName = () => {
    if (lessonData) {
      let numLessons = lessonData.length;
      let imageClassNum = Math.min(
        ...lessonBtnImages.filter((num: number) => num >= numLessons)
      );

      let bgVarName =
        imageClassNum == Infinity
          ? `lessonBgImg${maxedOut}`
          : `lessonBgImg${imageClassNum}`;

      return bgVarName;
    }

    return "";
  };

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  // TODO: change to display error some other way
  if (lessonErr) {
    console.log("An error has occurred: " + lessonErr);
    return (
      <IonSkeletonText
        animated={true}
        className={`${styles.lessonSkeleton}`}
      ></IonSkeletonText>
    );
  }

  return (
    <>
      {!lessonsLoading ? (
        <IonButton
          color="clear"
          expand="block"
          title="Lessons"
          onClick={goToLessons}
          className={`${styles.lessonBtn}`}
          style={{
            backgroundImage: `url(${getLessonBgByKey(setBgImgName())})`,
          }}
        >
          <p className={`${styles.lessonBtnTxt}`}>Lessons</p>
          <IonBadge className={`${styles.lessonBtnBadge}`}>
            {lessonData ? lessonData.length : 0}
          </IonBadge>
        </IonButton>
      ) : (
        <IonSkeletonText
          animated={true}
          className={`${styles.lessonSkeleton}`}
        ></IonSkeletonText>
      )}
    </>
  );
};

export default LessonsButton;
