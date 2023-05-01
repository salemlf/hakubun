import { useState } from "react";

import {
  IonInput,
  IonContent,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";

const TokenInput = () => {
  // TODO: change token to useRef?
  const [token, setToken] = useState("");
  const [loading, isLoading] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const auth = useAuth();

  const setAuth = async () => {
    isLoading(true);
    let success = await auth.setAuth(token);

    if (success) {
      setAuthErr("");
    } else {
      setAuthErr(
        "An error occurred retrieving your info, make sure your API token is correct"
      );
    }

    isLoading(false);
  };

  const onInput = (ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;
    setToken(value);
  };

  // TODO: make spinner (loading thingy) larger and center of screen
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Authorize Hakubun</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          fill="outline"
          label="WaniKani API Token"
          style={styles.input}
          onIonInput={onInput}
        ></IonInput>
        {authErr.length > 0 && <p style={styles.err}>{authErr}</p>}
        {loading && <IonSpinner name="dots"></IonSpinner>}
        <IonButton
          color="tertiary"
          disabled={!token}
          title="Submit"
          onClick={setAuth}
        >
          Submit
        </IonButton>
      </IonContent>
    </>
  );
};

export default TokenInput;

// TODO: change to use css file
const styles = {
  // TODO: change this based on dark mode or light
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  err: {
    color: "red",
  },
};
