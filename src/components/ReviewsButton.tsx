import { IonButton } from "@ionic/react";

interface Props {
  handleClick: () => void;
  numReviews?: number;
}

const ReviewsButton = ({ handleClick, numReviews }: Props) => {
  // TODO: change image based on num of reviews

  return (
    <IonButton expand="block" title="Reviews" onClick={() => handleClick()}>
      Reviews: {numReviews}
    </IonButton>
  );
};

export default ReviewsButton;
