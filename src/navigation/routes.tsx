import { RouteObject } from "react-router-dom";
import ErrorOccurred from "../pages/ErrorOccured/ErrorOccurred";
import Home from "../pages/Home/Home";
import LessonQuiz from "../pages/LessonQuiz/LessonQuiz";
import LessonSession from "../pages/LessonSession/LessonSession";
import LessonSettings from "../pages/LessonSettings/LessonSettings";
import LessonSummary from "../pages/LessonSummary/LessonSummary";
import ReviewSession from "../pages/ReviewSession/ReviewSession";
import ReviewSummary from "../pages/ReviewSummary/ReviewSummary";
import TokenInput from "../pages/TokenInput/TokenInput";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";
import { ReviewSettings } from "../pages/ReviewSettings/ReviewSettings";
import { SubjectDetails } from "../pages/SubjectDetails/SubjectDetails";
import { Subjects } from "../pages/Subjects/Subjects";
import { Search } from "../pages/Search/Search";
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
