import { useEffect, useState } from "react";
import { IonButton, IonBadge, IonSkeletonText } from "@ionic/react";

import { useReviews } from "../../hooks/useReviews";

import { getReviewBgByKey } from "../../services/ImageSrcService";

import styles from "./ReviewsButton.module.scss";

type Props = {
  level: number | undefined;
};

const reviewBtnImages = [0, 49, 99, 249, 499, 999, 1000];
const maxedOut = reviewBtnImages.at(-1);

// TODO: combine component with Lessons Button?
const ReviewsButton = ({ level }: Props) => {
  const [bgImgName, setBgImgName] = useState<string>("");
  const [reviewNum, setReviewNum] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const {
    isLoading: reviewLoading,
    data: reviewData,
    error: reviewErr,
  } = useReviews(level);

  // TODO: move this elsewhere, generalized?
  useEffect(() => {
    if (reviewData) {
      let numReviews = reviewData.length;
      let imageClassNum = Math.min(
        ...reviewBtnImages.filter((num: number) => num >= numReviews)
      );

      let bgVarName =
        imageClassNum == Infinity
          ? `reviewBgImg${maxedOut}`
          : `reviewBgImg${imageClassNum}`;

      setReviewNum(numReviews);
      setBgImgName(bgVarName);

      setLoading(false);
    }
  }, [reviewData]);

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
            backgroundImage: `url(${getReviewBgByKey(bgImgName)})`,
          }}
        >
          <p className={`${styles.reviewBtnTxt}`}>Reviews</p>
          <IonBadge className={`${styles.reviewBtnBadge}`}>
            {reviewNum}
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
