import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { IonApp, setupIonicReact } from "@ionic/react";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider, useUserAuth } from "./contexts/AuthContext";
import { ReviewSessionDataProvider } from "./contexts/ReviewSessionDataContext";
import { ReviewSessionQueueProvider } from "./contexts/ReviewSessionQueueContext";
import ProtectedRoute from "./navigation/ProtectedRoute";
import TokenInput from "./pages/TokenInput";
import { ReviewSettings } from "./pages/ReviewSettings";
import { ReviewSessionQueue } from "./pages/ReviewSessionQueue";
import ReviewSummary from "./pages/ReviewSummary";
import LessonSettings from "./pages/LessonSettings";
import LessonSession from "./pages/LessonSession";
import { Search } from "./pages/Search";
import { Subjects } from "./pages/Subjects";
import LessonQuiz from "./pages/LessonQuiz";
import { SubjectDetails } from "./pages/SubjectDetails";
import Home from "./pages/Home";
import FloatingTabBar from "./components/FloatingTabBar";

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

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ReviewSessionDataProvider>
          <ReviewSessionQueueProvider>
            <ToastPrimitive.Provider>
              <IonApp>
                <RouterProvider router={browserRouter} />
              </IonApp>
            </ToastPrimitive.Provider>
          </ReviewSessionQueueProvider>
        </ReviewSessionDataProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const AppElements = () => {
  const location = useLocation();
  const [showTabs, setShowTabs] = useState(true);
  // TODO: change implementation so don't need to list all these
  const pagesToHideTabBar = [
    "/reviews/settings",
    "/reviews/session",
    "/reviews/summary",
    "/lessons/settings",
    "/lessons/session",
    "/lessons/quiz",
    "/authenticate",
  ];

  const { authLoading, isAuthenticated } = useUserAuth();

  let tabBarStyle = showTabs === true ? undefined : { display: "none" };

  useEffect(() => {
    if (pagesToHideTabBar.includes(location.pathname)) {
      setShowTabs(false);
    } else {
      setShowTabs(true);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index element={<TokenInput />} />
        <Route path="/authenticate" element={<TokenInput />} />
        <Route
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              authLoading={authLoading}
            />
          }
        >
          <Route path="/reviews/settings" element={<ReviewSettings />} />
          <Route
            path="/reviews/session"
            element={<ReviewSessionQueue />}
          ></Route>
          <Route path="/reviews/summary" element={<ReviewSummary />} />
          <Route path="/lessons/settings" element={<LessonSettings />} />
          <Route path="/lessons/session" element={<LessonSession />} />
          <Route path="/lessons/quiz" element={<LessonQuiz />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/search" element={<Search />} />
          <Route path="/subjects/:id" element={<SubjectDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Route>
        <Route path="*" element={<p>Oh no, 404!</p>} />
      </Routes>
      <FloatingTabBar styleProps={tabBarStyle} />
    </AnimatePresence>
  );
};

const browserRouter = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<AppElements />} />)
);

export default App;
