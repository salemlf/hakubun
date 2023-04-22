// import React from "react";
// import { Text, View, ActivityIndicator } from "react-native";
import { IonButton, IonSpinner } from "@ionic/react";

export const Loading = () => {
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
};
