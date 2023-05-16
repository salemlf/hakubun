// Image sources for reviews button
import reviewBgImg0 from "../images/bg_reviews_0.png";
import reviewBgImg49 from "../images/bg_reviews_1-49.png";
import reviewBgImg99 from "../images/bg_reviews_100-249.png";
import reviewBgImg249 from "../images/bg_reviews_100-249.png";
import reviewBgImg499 from "../images/bg_reviews_250-499.png";
import reviewBgImg999 from "../images/bg_reviews_500-999.png";
import reviewBgImg1000 from "../images/bg_reviews_500-999.png";

// Image sources for lessons button
import lessonBgImg0 from "../images/bg_lessons_0.png";
import lessonBgImg24 from "../images/bg_lessons_1-24.png";
import lessonBgImg49 from "../images/bg_lessons_25-49.png";
import lessonBgImg99 from "../images/bg_lessons_50-99.png";
import lessonBgImg249 from "../images/bg_lessons_100-249.png";
import lessonBgImg499 from "../images/bg_lessons_250-499.png";
import lessonBgImg500 from "../images/bg_lessons_500+.png";

const reviewBgImages: {} = {
  reviewBgImg0,
  reviewBgImg49,
  reviewBgImg99,
  reviewBgImg249,
  reviewBgImg499,
  reviewBgImg999,
  reviewBgImg1000,
};

export const getReviewBgByKey = (key: string) => {
  return reviewBgImages[key as keyof {}];
};

const lessonBgImages: {} = {
  lessonBgImg0,
  lessonBgImg24,
  lessonBgImg49,
  lessonBgImg99,
  lessonBgImg249,
  lessonBgImg499,
  lessonBgImg500,
};

export const getLessonBgByKey = (key: string) => {
  return lessonBgImages[key as keyof {}];
};

export const setSubjectAvailImgs = (subject: any) => {
  let updatedSubj = subject;
  if (updatedSubj.characters == null) {
    let availableImages =
      updatedSubj.character_images
        ?.filter((image: any) => image.content_type === "image/png")
        .map((image: any) => image.url) || null;

    updatedSubj.availableImages = availableImages;
    updatedSubj.useImage = true;
  } else {
    updatedSubj.useImage = false;
  }

  return updatedSubj;
};
