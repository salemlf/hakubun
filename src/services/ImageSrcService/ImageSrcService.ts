// Image sources for reviews button
import reviewsBgImg0 from "../../images/bg_reviews_0.png";
import reviewsBgImg49 from "../../images/bg_reviews_1-49.png";
import reviewsBgImg99 from "../../images/bg_reviews_100-249.png";
import reviewsBgImg249 from "../../images/bg_reviews_100-249.png";
import reviewsBgImg499 from "../../images/bg_reviews_250-499.png";
import reviewsBgImg999 from "../../images/bg_reviews_500-999.png";
import reviewsBgImg1000 from "../../images/bg_reviews_500-999.png";

// Image sources for lessons button
import lessonsBgImg0 from "../../images/bg_lessons_0.png";
import lessonsBgImg24 from "../../images/bg_lessons_1-24.png";
import lessonsBgImg49 from "../../images/bg_lessons_25-49.png";
import lessonsBgImg99 from "../../images/bg_lessons_50-99.png";
import lessonsBgImg249 from "../../images/bg_lessons_100-249.png";
import lessonsBgImg499 from "../../images/bg_lessons_250-499.png";
import lessonsBgImg500 from "../../images/bg_lessons_500+.png";
import { Subject, SubjectCharacterImage } from "../../types/Subject";

// preferring png images, svg never seems to work so always uses fallback
const sortCharacterImages = (
  imgA: SubjectCharacterImage,
  imgB: SubjectCharacterImage
) => {
  const pngFileType = "image/png";

  if (imgA.content_type === pngFileType && imgB.content_type !== pngFileType) {
    return 1;
  }
  if (imgA.content_type !== pngFileType && imgB.content_type === pngFileType) {
    return -1;
  }
  return 0;
};

export const setSubjectAvailImgs = (subject: Subject) => {
  const updatedSubj = subject;
  if (updatedSubj.characters === null || updatedSubj.characters === "") {
    const imagesSorted =
      updatedSubj.character_images?.sort(sortCharacterImages);
    const imageUrls = imagesSorted?.map(
      (image: SubjectCharacterImage) => image.url
    );

    updatedSubj.availableImages = imageUrls;
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

export const setBtnBackground = ({ btnType, numItems }: ButtonImgProps) => {
  const imgNums = btnImgSrcs[btnType].imgNums;
  const maxedOut = imgNums[imgNums.length - 1];

  const imageClassNum = Math.min(
    ...imgNums.filter((num: number) => num >= numItems)
  );

  const bgVarName =
    imageClassNum == Infinity
      ? `${btnType}BgImg${maxedOut}`
      : `${btnType}BgImg${imageClassNum}`;
  const bgSrc = btnImgSrcs[btnType].bgImages[bgVarName as keyof object];
  return bgSrc;
};
