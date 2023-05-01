import bgImg0 from "./images/bg_lessons_0.png";
import bgImg24 from "./images/bg_lessons_1-24.png";
import bgImg49 from "./images/bg_lessons_25-49.png";
import bgImg99 from "./images/bg_lessons_50-99.png";
import bgImg249 from "./images/bg_lessons_100-249.png";
import bgImg499 from "./images/bg_lessons_250-499.png";
import bgImg500 from "./images/bg_lessons_500+.png";

const bgImages: {} = {
  bgImg0,
  bgImg24,
  bgImg49,
  bgImg99,
  bgImg249,
  bgImg499,
  bgImg500,
};

function getBgByKey(key: string) {
  return bgImages[key as keyof {}];
}

export default getBgByKey;
