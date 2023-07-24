import { IonSpinner } from "@ionic/react";

function Loading() {
  return (
    <div
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <p>Loading...</p>
      <IonSpinner name="dots"></IonSpinner>
    </div>
  );
}

export default Loading;
