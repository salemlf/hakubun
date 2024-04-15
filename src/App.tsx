import { useEffect } from "react";
import * as LogRocket from "logrocket";
import * as Sentry from "@sentry/react";
import { httpClientIntegration } from "@sentry/integrations";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  RouterProvider,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { baseUrlRegex, setAxiosHeaders } from "./api/ApiConfig";
import { routes } from "./navigation/routes";
import useAuthTokenStoreFacade from "./stores/useAuthTokenStore/useAuthTokenStore.facade";
import useUserInfoStoreFacade from "./stores/useUserInfoStore/useUserInfoStore.facade";
import { useUserSettingsStore } from "./stores/useUserSettingsStore/useUserSettingsStore";
import { onQueryError } from "./services/ApiQueryService/ApiQueryService";
import { BottomSheetOpenProvider } from "./contexts/BottomSheetOpenContext";
import { PersistentStore } from "./hooks/useHydration";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastDisplayProvider } from "./components/Toast/ToastDisplayProvider";
import HydrationWrapper from "./components/HydrationWrapper";

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

export const RELEASE_VERSION = "0.4.2-alpha";

// for mock service worker
async function enableMocking() {
  if (import.meta.env.MODE === "development") {
    const { worker } = await import("./testing/worker");
    worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

// increasing audio pool size since using lots of audio files
Howler.html5PoolSize = 100;

await enableMocking();

if (import.meta.env.MODE !== "development" && import.meta.env.MODE !== "test") {
  LogRocket.init("cleqvf/hakubun", {
    release: RELEASE_VERSION,
    shouldCaptureIP: false,
    network: {
      requestSanitizer: (request) => {
        request.headers["Authorization"] = "";
        return request;
      },
    },
  });
  Sentry.init({
    release: RELEASE_VERSION,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracePropagationTargets: [baseUrlRegex],
    environment: import.meta.env.MODE,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
      httpClientIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.5,
    replaysOnErrorSampleRate: 1.0,
  });
}

// TODO: change so not using setupIonicReact and IonApp
setupIonicReact();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // stale time of 10 minutes
      staleTime: 10 * (60 * 1000),
      // garbage collection time of 15 minutes
      gcTime: 15 * (60 * 1000),
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      onQueryError(error, query);
    },
  }),
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

const App: React.FC = () => {
  const { authToken } = useAuthTokenStoreFacade();
  const { userInfo } = useUserInfoStoreFacade();

  const browserRouter = getBrowserRouter();

  // setting the auth token headers for all api requests
  setAxiosHeaders(authToken);

  // setting current user if that info is available
  if (userInfo) {
    LogRocket.identify(`${userInfo.username}`, {
      name: `${userInfo.username}`,
    });

    Sentry.setUser({ username: `${userInfo.username}` });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ToastDisplayProvider />
      <HydrationWrapper store={useUserSettingsStore as PersistentStore}>
        <ThemeProvider>
          <BottomSheetOpenProvider>
            <IonApp>
              <RouterProvider router={browserRouter} />
            </IonApp>
          </BottomSheetOpenProvider>
        </ThemeProvider>
      </HydrationWrapper>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

const getBrowserRouter = () => {
  return sentryCreateBrowserRouter(routes);
};

export default App;
