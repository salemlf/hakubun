import bgImg0 from "../images/bg_reviews_0.png";
import bgImg49 from "../images/bg_reviews_1-49.png";
import bgImg99 from "../images/bg_reviews_100-249.png";
import bgImg249 from "../images/bg_reviews_100-249.png";
import bgImg499 from "../images/bg_reviews_250-499.png";
import bgImg999 from "../images/bg_reviews_500-999.png";
import bgImg1000 from "../images/bg_reviews_500-999.png";

const bgImages: {} = {
  bgImg0,
  bgImg49,
  bgImg99,
  bgImg249,
  bgImg499,
  bgImg999,
  bgImg1000,
};

function getBgByKey(key: string) {
  return bgImages[key as keyof {}];
}

export default getBgByKey;
