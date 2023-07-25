// Image sources for reviews button
import reviewsBgImg0 from "../images/bg_reviews_0.png";
import reviewsBgImg49 from "../images/bg_reviews_1-49.png";
import reviewsBgImg99 from "../images/bg_reviews_100-249.png";
import reviewsBgImg249 from "../images/bg_reviews_100-249.png";
import reviewsBgImg499 from "../images/bg_reviews_250-499.png";
import reviewsBgImg999 from "../images/bg_reviews_500-999.png";
import reviewsBgImg1000 from "../images/bg_reviews_500-999.png";

// Image sources for lessons button
import lessonsBgImg0 from "../images/bg_lessons_0.png";
import lessonsBgImg24 from "../images/bg_lessons_1-24.png";
import lessonsBgImg49 from "../images/bg_lessons_25-49.png";
import lessonsBgImg99 from "../images/bg_lessons_50-99.png";
import lessonsBgImg249 from "../images/bg_lessons_100-249.png";
import lessonsBgImg499 from "../images/bg_lessons_250-499.png";
import lessonsBgImg500 from "../images/bg_lessons_500+.png";
import { Subject } from "../types/Subject";

export const setSubjectAvailImgs = (subject: Subject) => {
  let updatedSubj = subject;
  if (updatedSubj.characters == null) {
    let availableImages = updatedSubj.character_images
      ?.filter((image: any) => image.content_type === "image/png")
      .map((image: any) => image.url);

    updatedSubj.availableImages = availableImages;
    updatedSubj.useImage = true;
  } else {
    updatedSubj.useImage = false;
  }

  return updatedSubj;
};

const btnImgSrcs = {
  reviews: {
    bgImages: {
      reviewsBgImg0,
      reviewsBgImg49,
      reviewsBgImg99,
      reviewsBgImg249,
      reviewsBgImg499,
      reviewsBgImg999,
      reviewsBgImg1000,
    },
    imgNums: [0, 49, 99, 249, 499, 999, 1000],
  },
  lessons: {
    bgImages: {
      lessonsBgImg0,
      lessonsBgImg24,
      lessonsBgImg49,
      lessonsBgImg99,
      lessonsBgImg249,
      lessonsBgImg499,
      lessonsBgImg500,
    },
    imgNums: [0, 24, 49, 99, 249, 499, 500],
  },
};

type ButtonImgProps = {
  btnType: "lessons" | "reviews";
  numItems: number;
};

export const setButtonImgSrc = ({ btnType, numItems }: ButtonImgProps) => {
  let imgNums = btnImgSrcs[btnType].imgNums;
  console.log(
    "🚀 ~ file: ImageSrcService.tsx:104 ~ setButtonImgSrc ~ imgNums:",
    imgNums
  );
  let maxedOut = imgNums.at(-1);

  let imageClassNum = Math.min(
    ...imgNums.filter((num: number) => num >= numItems)
  );

  let bgVarName =
    imageClassNum == Infinity
      ? `${btnType}BgImg${maxedOut}`
      : `${btnType}BgImg${imageClassNum}`;

  return bgVarName;
};

export const setBtnBackground = ({ btnType, numItems }: ButtonImgProps) => {
  let imgNums = btnImgSrcs[btnType].imgNums;
  let maxedOut = imgNums.at(-1);

  let imageClassNum = Math.min(
    ...imgNums.filter((num: number) => num >= numItems)
  );

  let bgVarName =
    imageClassNum == Infinity
      ? `${btnType}BgImg${maxedOut}`
      : `${btnType}BgImg${imageClassNum}`;
  let bgSrc = btnImgSrcs[btnType].bgImages[bgVarName as keyof {}];
  return bgSrc;
};
