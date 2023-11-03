import ProtectedRoute from "./ProtectedRoute";
import ErrorOccurred from "../pages/ErrorOccurred";
import Home from "../pages/Home";
import LessonQuiz from "../pages/LessonQuiz";
import LessonSession from "../pages/LessonSession";
import LessonSettings from "../pages/LessonSettings";
import LessonSummary from "../pages/LessonSummary";
import ReviewSession from "../pages/ReviewSession";
import ReviewSummary from "../pages/ReviewSummary";
import TokenInput from "../pages/TokenInput";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import { ReviewSettings } from "../pages/ReviewSettings";
import { SubjectDetails } from "../pages/SubjectDetails";
import { Subjects } from "../pages/Subjects";
import { Search } from "../pages/Search";
import RootContainer from "../components/RootContainer";
import { RouteObject } from "react-router-dom";

type BrowserRouterProps = {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
};

export const getRoutes = ({
  isAuthenticated,
  isAuthLoading,
}: BrowserRouterProps): RouteObject[] => {
  let childRoutes = getChildRoutes({ isAuthenticated, isAuthLoading });
  return [
    {
      errorElement: <ErrorOccurred />,
      element: <RootContainer />,
      children: childRoutes,
    },
  ];
};

const getChildRoutes = ({
  isAuthenticated,
  isAuthLoading,
}: BrowserRouterProps): RouteObject[] => {
  return [
    { path: "/authenticate", element: <TokenInput /> },
    {
      index: true,
      path: "/",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "/settings",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <Settings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reviews/session",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <ReviewSession />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reviews/settings",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <ReviewSettings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lessons/settings",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <LessonSettings />
        </ProtectedRoute>
      ),
    },
    {
      path: "/reviews/summary",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <ReviewSummary />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lessons/session",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <LessonSession />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lessons/quiz",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <LessonQuiz />
        </ProtectedRoute>
      ),
    },
    {
      path: "/lessons/summary",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <LessonSummary />
        </ProtectedRoute>
      ),
    },
    {
      path: "/subjects",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <Subjects />
        </ProtectedRoute>
      ),
    },
    {
      path: "/subjects/:id",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <SubjectDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/search",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          authLoading={isAuthLoading}
        >
          <Search />
        </ProtectedRoute>
      ),
    },
    { path: "*", element: <NotFound /> },
  ];
};
