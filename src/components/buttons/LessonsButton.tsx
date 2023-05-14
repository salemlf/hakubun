import { useEffect, useState } from "react";
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
  const [bgImgName, setBgImgName] = useState<string>("");
  const [lessonNum, setLessonNum] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const {
    isLoading: lessonsLoading,
    data: lessonData,
    error: lessonErr,
  } = useLessons({ level: level });

  useEffect(() => {
    if (lessonData) {
      let numLessons = lessonData.length;
      let imageClassNum = Math.min(
        ...lessonBtnImages.filter((num: number) => num >= numLessons)
      );

      let bgVarName =
        imageClassNum == Infinity
          ? `lessonBgImg${maxedOut}`
          : `lessonBgImg${imageClassNum}`;

      setLessonNum(numLessons);
      setBgImgName(bgVarName);

      setLoading(false);
    }
  }, [lessonData]);

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  return (
    <>
      {!loading ? (
        <IonButton
          color="clear"
          expand="block"
          title="Lessons"
          onClick={goToLessons}
          className={`${styles.lessonBtn}`}
          style={{
            backgroundImage: `url(${getLessonBgByKey(bgImgName)})`,
          }}
        >
          <p className={`${styles.lessonBtnTxt}`}>Lessons</p>
          <IonBadge className={`${styles.lessonBtnBadge}`}>
            {lessonNum}
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
