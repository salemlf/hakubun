import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import { ReviewSettings } from "../pages/ReviewSettings";
import { ReviewSessionQueue } from "../pages/ReviewSessionQueue";
import { Subjects } from "../pages/Subjects";
import { Search } from "../pages/Search";
import ReviewSummary from "../pages/ReviewSummary";
import FloatingTabBar from "../components/FloatingTabBar";
import LessonSettings from "../pages/LessonSettings";

export const AppStack = () => {
  // TODO: trigger some event for this, use listenerEvent.canGoBack
  // App.addListener("backButton", (listenerEvent) => {
  //   console.log("Back button used! listenerEvent:", listenerEvent);
  // });

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showTabs, setShowTabs] = useState(true);
  const pagesToHideTabBar = [
    "/reviews/settings",
    "/reviews/session",
    "/reviews/summary",
    "/lessons/settings",
  ];

  let tabBarStyle = showTabs === true ? undefined : { display: "none" };

  useEffect(() => {
    if (pagesToHideTabBar.includes(location.pathname)) {
      setShowTabs(false);
    } else {
      setShowTabs(true);
    }
  }, [location.pathname]);

  // !added
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      App.addListener("backButton", ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        } else {
          navigate(-1);
        }
      });
    }
    return () => {
      App.removeAllListeners();
    };
  }, [history]);
  // !added

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/reviews/settings" element={<ReviewSettings />} />
        <Route path="/reviews/session" element={<ReviewSessionQueue />}></Route>
        <Route path="/reviews/summary" element={<ReviewSummary />} />
        <Route path="/lessons/settings" element={<LessonSettings />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/search" element={<Search />} />
        <Route path="/subjects/:id" element={<SubjectDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/authenticate" element={<Navigate replace to="/home" />} />
      </Routes>
      <FloatingTabBar styleProps={tabBarStyle} />
    </AnimatePresence>
  );
};
