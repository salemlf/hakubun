import { useEffect } from "react";
import * as LogRocket from "logrocket";
import * as Sentry from "@sentry/react";
import { HttpClient } from "@sentry/integrations";
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
import { SafeArea } from "capacitor-plugin-safe-area";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useAuthTokenStoreFacade from "./stores/useAuthTokenStore/useAuthTokenStore.facade";
import useUserInfoStoreFacade from "./stores/useUserInfoStore/useUserInfoStore.facade";
import { onQueryError } from "./services/ApiQueryService";
import { baseUrlRegex, setAxiosHeaders } from "./api/ApiConfig";
import { routes } from "./navigation/routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastDisplayProvider } from "./components/Toast/ToastDisplayProvider";

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

// for mock service worker
async function enableMocking() {
  if (import.meta.env.MODE === "development") {
    const { worker } = await import("./testing/worker");
    worker.start();
  }
}

enableMocking();

// TODO: improve this so not manually changing release version every time
if (import.meta.env.MODE !== "development" && import.meta.env.MODE !== "test") {
  LogRocket.init("cleqvf/hakubun", {
    release: "0.3.3-alpha",
    shouldCaptureIP: false,
    network: {
      requestSanitizer: (request) => {
        request.headers["Authorization"] = "";
        return request;
      },
    },
  });
  Sentry.init({
    release: "0.3.3-alpha",
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracePropagationTargets: [baseUrlRegex],
    environment: import.meta.env.MODE,
    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        ),
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
      }),
      new HttpClient({}),
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
      // cache time of 15 minutes
      cacheTime: 15 * (60 * 1000),
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

  useEffect(() => {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      console.log(insets);
    });

    SafeArea.getStatusBarHeight().then(({ statusBarHeight }) => {
      console.log(statusBarHeight, "statusbarHeight");
    });

    SafeArea.addListener("safeAreaChanged", (data) => {
      const { insets } = data;
      for (const [key, value] of Object.entries(insets)) {
        document.documentElement.style.setProperty(
          `--safe-area-${key}`,
          `${value}px`
        );
      }
    });
    return () => {
      SafeArea.removeAllListeners();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastDisplayProvider />
      <ThemeProvider>
        <IonApp>
          <RouterProvider router={browserRouter} />
        </IonApp>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

const getBrowserRouter = () => {
  return sentryCreateBrowserRouter(routes);
};

export default App;
