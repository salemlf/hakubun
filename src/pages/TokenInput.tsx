import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  IonInput,
  IonContent,
  IonSpinner,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonSkeletonText,
} from "@ionic/react";
import { useUserAuth } from "../contexts/AuthContext";

const TokenInput = () => {
  // TODO: change token to useRef?
  const [token, setToken] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authErr, setAuthErr] = useState("");
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const auth = useUserAuth();

  useEffect(() => {
    if (auth) {
      setLoading(false);
    }
  }, [auth.isAuthenticated]);

  const setAuth = async () => {
    let success = await auth.login(token);

    if (success) {
      console.log("Successfully logged in!");
      setAuthErr("");
      history.push("/home");
    } else {
      setAuthErr(
        "An error occurred retrieving your info, make sure your API token is correct"
      );
    }

    setIsAuthLoading(false);
  };

  const onInput = (ev: Event) => {
    const value = (ev.target as HTMLIonInputElement).value as string;
    setToken(value);
  };

  // TODO: make spinner (loading thingy) larger and center of screen
  return (
    <>
      {!loading ? (
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
            {isAuthLoading && <IonSpinner name="dots"></IonSpinner>}
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
      ) : (
        <>
          <IonHeader>
            <IonToolbar>
              <IonTitle>
                <IonSkeletonText
                  animated={true}
                  style={{ height: "50px" }}
                ></IonSkeletonText>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonInput label="WaniKani API Token Loading Skeleton">
              <IonSkeletonText
                animated={true}
                style={{ height: "50px" }}
              ></IonSkeletonText>
            </IonInput>
            <IonSkeletonText animated={true}></IonSkeletonText>
          </IonContent>
        </>
      )}
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
