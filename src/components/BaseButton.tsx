import { IonButton } from "@ionic/react";

interface Props {
  handleClick: () => void;
  textEntered: string;
  buttonText: string;
}

const BaseButton = ({ handleClick, textEntered, buttonText }: Props) => {
  return (
    <div style={{ padding: 10 }}>
      <IonButton
        disabled={!textEntered}
        title="Submit"
        onClick={() => handleClick()}
      >
        {buttonText}
      </IonButton>
    </div>
  );
};

export default BaseButton;
