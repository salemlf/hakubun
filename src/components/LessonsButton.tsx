import { IonButton } from "@ionic/react";

interface Props {
  handleClick: () => void;
  numLessons?: number;
}

const LessonsButton = ({ handleClick, numLessons }: Props) => {
  // TODO: change background image based on num of lessons

  return (
    <IonButton expand="block" title="Lessons" onClick={() => handleClick()}>
      Lessons: {numLessons}
    </IonButton>
  );
};

export default LessonsButton;
