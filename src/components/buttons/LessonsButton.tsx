import { IonButton, IonBadge, IonSkeletonText } from "@ionic/react";

import { useNumLessons } from "../../hooks/useLessonNum";

import { setBtnBackground } from "../../services/ImageSrcService";

import styles from "./LessonsButton.module.scss";

type Props = {
  level: number;
};

const LessonsButton = ({ level }: Props) => {
  const {
    isLoading: numLessonsLoading,
    data: numLessons,
    error: lessonErr,
  } = useNumLessons({ level: level });

  // TODO: change to display error some other way
  if (lessonErr) {
    console.log("An error has occurred in LessonsButton: " + lessonErr);
    return (
      <IonSkeletonText
        animated={true}
        className={`${styles.lessonSkeleton}`}
      ></IonSkeletonText>
    );
  }

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  return (
    <>
      {!numLessonsLoading ? (
        <IonButton
          color="clear"
          expand="block"
          title="Lessons"
          onClick={goToLessons}
          className={`${styles.lessonBtn}`}
          style={{
            backgroundImage: `url(${
              numLessons
                ? setBtnBackground({ btnType: "lessons", numItems: numLessons })
                : ""
            })`,
          }}
        >
          <p className={`${styles.lessonBtnTxt}`}>Lessons</p>
          <IonBadge className={`${styles.lessonBtnBadge}`}>
            {numLessons ? numLessons : 0}
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
