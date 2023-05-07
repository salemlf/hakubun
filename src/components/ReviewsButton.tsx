import { useEffect, useState } from "react";
import { IonButton, IonBadge, IonSkeletonText } from "@ionic/react";

import getBgByKey from "../helpers/getReviewBgByKey";

import styles from "./ReviewsButton.module.scss";

interface Props {
  numReviews: number | undefined;
}

const reviewBtnImages = [0, 49, 99, 249, 499, 999, 1000];
const maxedOut = reviewBtnImages.at(-1);

// TODO: combine component with Lessons Button?
const ReviewsButton = ({ numReviews }: Props) => {
  const [bgImgName, setBgImgName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (numReviews) {
      // TODO: uncomment when done testing
      let imageClassNum = Math.min(
        ...reviewBtnImages.filter((num: number) => num >= numReviews)
      );

      let bgVarName =
        imageClassNum == Infinity
          ? `bgImg${maxedOut}`
          : `bgImg${imageClassNum}`;

      setBgImgName(bgVarName);

      setLoading(false);
    }
  }, [numReviews]);

  const goToReviews = () => {
    // TODO: use reviewData
    console.log("TODO: add reviews button action");
  };

  return (
    <>
      {!loading ? (
        <IonButton
          expand="block"
          title="Reviews"
          color="clear"
          onClick={goToReviews}
          className={`${styles.reviewBtn}`}
          style={{
            backgroundImage: `url(${getBgByKey(bgImgName)})`,
          }}
        >
          <p className={`${styles.reviewBtnTxt}`}>Reviews</p>
          <IonBadge className={`${styles.reviewBtnBadge}`}>
            {numReviews}
          </IonBadge>
        </IonButton>
      ) : (
        <IonSkeletonText
          animated={true}
          className={`${styles.reviewsSkeleton}`}
        ></IonSkeletonText>
      )}
    </>
  );
};

export default ReviewsButton;
