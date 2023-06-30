import { useRef } from "react";
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

// TODO: pass in subject info
export const ReviewItemBottomSheet = () => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={true}
      initialBreakpoint={0.06}
      breakpoints={[0.06, 1]}
      handleBehavior="cycle"
      canDismiss={false}
      backdropDismiss={false}
      backdropBreakpoint={0.5}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle>Subject Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Subject info goes here!</p>
      </IonContent>
    </IonModal>
  );
};
