import { ToastMessageType } from "../../types/AssignmentQueueTypes";
import Toast from "../Toast/Toast";

const toastColors: {
  [index: string]: {
    bgColor: string;
    color: string;
  };
} = {
  correct: {
    bgColor: "var(--ion-color-tertiary)",
    color: "black",
  },
  incorrect: {
    bgColor: "var(--ion-color-danger)",
    color: "white",
  },
};

const toastText: { [index: string]: { title: string; content: string } } = {
  correct: {
    title: "Correct",
    content: "Whoohoo, you got it!",
  },
  incorrect: {
    title: "Incorrect",
    content: "Oh no! That's okay, mistakes are how you learn!",
  },
};

const getToastColor = (messageType: ToastMessageType) => {
  return toastColors[messageType as keyof { [index: string]: string }];
};

const getToastText = (messageType: ToastMessageType) => {
  return toastText[
    messageType as keyof { [index: string]: { title: string; content: string } }
  ];
};

type Props = {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  toastType: ToastMessageType;
};

function ReviewResultToast({ showToast, setShowToast, toastType }: Props) {
  let { title, content } = getToastText(toastType);
  let { bgColor, color } = getToastColor(toastType);

  return (
    <Toast
      title={title}
      content={content}
      open={showToast}
      onOpenChange={setShowToast}
      duration={100000}
      bgColor={bgColor}
      textColor={color}
    ></Toast>
  );
}

export default ReviewResultToast;
