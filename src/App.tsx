import { IonApp, setupIonicReact } from "@ionic/react";
import { AuthProvider } from "./contexts/AuthContext";
import { ReviewSessionDataProvider } from "./contexts/ReviewSessionDataContext";
import { ReviewSessionQueueProvider } from "./contexts/ReviewSessionQueueContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Router from "./navigation/Router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/globals.scss";

// TODO: change so not using setupIonicReact and IonApp
setupIonicReact();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time of 10 minutes
      staleTime: 10 * (60 * 1000),
      // cache time of 15 minutes
      cacheTime: 15 * (60 * 1000),
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <AuthProvider>
        <ReviewSessionDataProvider>
          <ReviewSessionQueueProvider>
            <ToastPrimitive.Provider>
              <Router />
            </ToastPrimitive.Provider>
          </ReviewSessionQueueProvider>
        </ReviewSessionDataProvider>
      </AuthProvider>
    </IonApp>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
