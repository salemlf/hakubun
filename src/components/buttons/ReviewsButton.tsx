import { IonButton, IonBadge, IonSkeletonText } from "@ionic/react";
import { useNumReviews } from "../../hooks/useNumReviews";
import { setBtnBackground } from "../../services/ImageSrcService";
import { useHistory } from "react-router";

import styles from "./ReviewsButton.module.scss";

type Props = {
  level: number | undefined;
};

const ReviewsButton = ({ level }: Props) => {
  const history = useHistory();
  const {
    isLoading: numReviewsLoading,
    data: numReviews,
    error: reviewErr,
  } = useNumReviews(level);

  // TODO: change to display error some other way
  if (reviewErr) {
    console.error("An error has occurred in ReviewsButton: " + reviewErr);
    return (
      <IonSkeletonText
        animated={true}
        className={`${styles.reviewsSkeleton}`}
      ></IonSkeletonText>
    );
  }

  // TODO: delay loading until image is set
  return (
    <>
      {!numReviewsLoading ? (
        <IonButton
          expand="block"
          title="Reviews"
          color="clear"
          // TODO: change so if no reviews -> doesn't redirect and displays a message
          onClick={() => history.push("/review/settings")}
          className={`${styles.reviewBtn}`}
          style={{
            backgroundImage: `url(${
              numReviews
                ? setBtnBackground({ btnType: "reviews", numItems: numReviews })
                : ""
            })`,
          }}
        >
          <p className={`${styles.reviewBtnTxt}`}>Reviews</p>
          <IonBadge className={`${styles.reviewBtnBadge}`}>
            {numReviews ? numReviews : 0}
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
