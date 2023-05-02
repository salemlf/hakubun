import { useEffect, useState } from "react";
import { IonButton, IonBadge } from "@ionic/react";

import getBgByKey from "../helpers/getLessonBgByKey";
import styles from "./LessonsButton.module.scss";

interface Props {
  numLessons: number | undefined;
}

const lessonBtnImages = [0, 24, 49, 99, 249, 499, 500];
const maxedOut = lessonBtnImages.at(-1);

// TODO: combine component with Reviews Button?
const LessonsButton = ({ numLessons }: Props) => {
  const [bgImgName, setBgImgName] = useState<string>("");

  useEffect(() => {
    if (numLessons) {
      // TODO: uncomment when done testing
      let imageClassNum = Math.min(
        ...lessonBtnImages.filter((num: number) => num >= numLessons)
      );

      let bgVarName =
        imageClassNum == Infinity
          ? `bgImg${maxedOut}`
          : `bgImg${imageClassNum}`;

      setBgImgName(bgVarName);
    }
  }, [numLessons]);

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  return (
    <IonButton
      color="clear"
      expand="block"
      title="Lessons"
      onClick={goToLessons}
      className={`${styles.lessonBtn}`}
      style={{
        backgroundImage: `url(${getBgByKey(bgImgName)})`,
      }}
    >
      <p className={`${styles.lessonBtnTxt}`}>Lessons</p>
      <IonBadge className={`${styles.lessonBtnBadge}`}>{numLessons}</IonBadge>
    </IonButton>
  );
};

export default LessonsButton;
