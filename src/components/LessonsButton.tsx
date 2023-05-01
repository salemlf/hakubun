import { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";

import getBgByKey from "../getLessonBgByKey";
import "./LessonsButton.module.scss";
import styles from "./LessonsButton.module.scss";

interface Props {
  numLessons: number;
}

// interface Obj {
//   [key: string]: any;
// }

const lessonBtnImages = [0, 24, 49, 99, 249, 499, 500];

const LessonsButton = ({ numLessons }: Props) => {
  // const [bgImgClass, setBgImgClass] = useState<number>(0);
  const [bgImgName, setBgImgName] = useState<string>("");

  // *testing
  // let testLessonNum = 150;
  // *testing
  useEffect(() => {
    // TODO: uncomment when done testing
    let imageClassNum = Math.min(
      ...lessonBtnImages.filter((num: number) => num >= numLessons)
    );

    // *testing
    // let imageClassNum = Math.min(
    //   ...lessonBtnImages.filter((num: number) => num >= testLessonNum)
    // );
    // console.log(
    //   "🚀 ~ file: LessonsButton.tsx:15 ~ useEffect ~ imageClassNum:",
    //   imageClassNum
    // );
    // *testing

    let bgVarName = `bgImg${imageClassNum}`;
    setBgImgName(bgVarName);

    console.log("bgImgName: ", bgImgName);
  }, [numLessons]);

  const goToLessons = () => {
    // TODO: use lessonData
    console.log("TODO: add lessons button action");
  };

  // TODO: move text left, show number as badge
  return (
    <IonButton
      expand="block"
      title="Lessons"
      onClick={goToLessons}
      className={`${styles.lessonBtn}`}
    >
      <img
        src={`${getBgByKey(bgImgName)}`}
        alt=""
        className={`${styles.lessonBtnBgImg}`}
      />
      <p className={`${styles.lessonBtnTxt}`}>Lessons: {numLessons}</p>
    </IonButton>
  );
};

export default LessonsButton;
