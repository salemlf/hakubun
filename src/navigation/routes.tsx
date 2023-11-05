import { RouteObject } from "react-router-dom";
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
import ProtectedRoute from "./ProtectedRoute";
import RootContainer from "../components/RootContainer";

const childRoutes: RouteObject[] = [
  { path: "/authenticate", element: <TokenInput /> },
  {
    index: true,
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reviews/session",
    element: (
      <ProtectedRoute>
        <ReviewSession />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reviews/settings",
    element: (
      <ProtectedRoute>
        <ReviewSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lessons/settings",
    element: (
      <ProtectedRoute>
        <LessonSettings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/reviews/summary",
    element: (
      <ProtectedRoute>
        <ReviewSummary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lessons/session",
    element: (
      <ProtectedRoute>
        <LessonSession />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lessons/quiz",
    element: (
      <ProtectedRoute>
        <LessonQuiz />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lessons/summary",
    element: (
      <ProtectedRoute>
        <LessonSummary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subjects",
    element: (
      <ProtectedRoute>
        <Subjects />
      </ProtectedRoute>
    ),
  },
  {
    path: "/subjects/:id",
    element: (
      <ProtectedRoute>
        <SubjectDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/search",
    element: (
      <ProtectedRoute>
        <Search />
      </ProtectedRoute>
    ),
  },
  { path: "*", element: <NotFound /> },
];

export const routes: RouteObject[] = [
  {
    errorElement: <ErrorOccurred />,
    element: <RootContainer />,
    children: childRoutes,
  },
];
