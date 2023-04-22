import { useState } from "react";

import {
  IonInput,
  IonContent,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";

import BaseButton from "../components/BaseButton";

// TODO: export authErr from AuthContext?
import { useAuth } from "../contexts/AuthContext";

const TokenInput = () => {
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
        <BaseButton
          handleClick={setAuth}
          textEntered={token}
          buttonText="Submit"
        />
      </IonContent>
    </>
  );
};

export default TokenInput;

const styles = {
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
