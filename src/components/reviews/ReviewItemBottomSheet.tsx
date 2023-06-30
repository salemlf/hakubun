import { useRef } from "react";
import {
  IonModal,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

// TODO: pass in subject info
// TODO: fix issue where this is showing up on other pages, change isOpen to be changed by passed in value

type Props = {
  isBottomSheetVisible: boolean;
};

export const ReviewItemBottomSheet = ({ isBottomSheetVisible }: Props) => {
  // *testing
  console.log(
    "🚀 ~ file: ReviewItemBottomSheet.tsx:18 ~ ReviewItemBottomSheet ~ isBottomSheetVisible:",
    isBottomSheetVisible
  );
  // *testing
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      isOpen={isBottomSheetVisible}
      initialBreakpoint={0.06}
      breakpoints={[0.06, 1]}
      handleBehavior="cycle"
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
