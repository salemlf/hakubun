import * as LogRocket from "logrocket";
import {
  Route,
  Routes,
  useLocation,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAuthTokenStore } from "./stores/useAuthTokenStore";
import { useUserInfoStore } from "./stores/useUserInfoStore";
import { api, pagingApi } from "./api/ApiConfig";
import ProtectedRoute from "./navigation/ProtectedRoute";
import TokenInput from "./pages/TokenInput";
import { ReviewSettings } from "./pages/ReviewSettings";
import { ReviewSession } from "./pages/ReviewSession";
import ReviewSummary from "./pages/ReviewSummary";
import LessonSettings from "./pages/LessonSettings";
import LessonSession from "./pages/LessonSession";
import { Search } from "./pages/Search";
import { Subjects } from "./pages/Subjects";
import LessonQuiz from "./pages/LessonQuiz";
import { SubjectDetails } from "./pages/SubjectDetails";
import Home from "./pages/Home";
import LessonSummary from "./pages/LessonSummary";
import Settings from "./pages/Settings";
// const { worker } = require("./mocks/browser");
import { worker } from "./testing/mocks/worker";

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

// TODO: improve this so not manually changing release version every time
if (import.meta.env.MODE !== "development") {
  LogRocket.init("cleqvf/hakubun", {
    release: "0.1.9-alpha",
    shouldCaptureIP: false,
  });
}

if (import.meta.env.MODE === "development") {
  worker.start();
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
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastPrimitive.Provider>
        <IonApp>
          <RouterProvider router={browserRouter} />
        </IonApp>
      </ToastPrimitive.Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

const AppElements = () => {
  const location = useLocation();

  const isAuthenticated = useAuthTokenStore.use.isAuthenticated();
  const isAuthLoading = useAuthTokenStore.use.isAuthLoading();
  const authToken = useAuthTokenStore.use.authToken();
  const userInfo = useUserInfoStore.use.userInfo();

  // setting the auth token headers for all api requests
  (function () {
    if (authToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      pagingApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken}`;
    } else {
      api.defaults.headers.common["Authorization"] = null;
      pagingApi.defaults.headers.common["Authorization"] = null;
    }
  })();

  // setting current user if that info is available
  if (userInfo) {
    LogRocket.identify(`${userInfo.username}`, {
      name: `${userInfo.username}`,
    });
  }

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route element={<TokenInput />} />
        <Route path="/authenticate" element={<TokenInput />} />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              authLoading={isAuthLoading}
            />
          }
        >
          <Route index path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/reviews/settings" element={<ReviewSettings />} />
          <Route path="/reviews/session" element={<ReviewSession />}></Route>
          <Route path="/reviews/summary" element={<ReviewSummary />} />
          <Route path="/lessons/settings" element={<LessonSettings />} />
          <Route path="/lessons/session" element={<LessonSession />} />
          <Route path="/lessons/quiz" element={<LessonQuiz />} />
          <Route path="/lessons/summary" element={<LessonSummary />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/subjects/:id" element={<SubjectDetails />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="*" element={<p>Oh no, 404!</p>} />
      </Routes>
    </AnimatePresence>
  );
};

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <div>
      <p>Woah! Something went really wrong :(</p>
      <p>Error: {`${error}`}</p>
    </div>
  );
}

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="*"
      element={<AppElements />}
      errorElement={<ErrorBoundary />}
    />
  )
);

export default App;
