import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "../pages/Home";
import { SubjectDetails } from "../pages/SubjectDetails";
import { ReviewSettings } from "../pages/ReviewSettings";
import { ReviewSessionQueue } from "../pages/ReviewSessionQueue";
import { Subjects } from "../pages/Subjects";
import { Search } from "../pages/Search";
import ReviewSummary from "../pages/ReviewSummary";
import { AnimatePresence } from "framer-motion";
import { App } from "@capacitor/app";

export const AppStack = () => {
  // TODO: trigger some event for this, use listenerEvent.canGoBack
  App.addListener("backButton", (listenerEvent) => {
    console.log("Back button used! listenerEvent:", listenerEvent);
  });

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/review/settings" element={<ReviewSettings />} />
          <Route
            path="/review/session"
            element={<ReviewSessionQueue />}
          ></Route>
          <Route path="/review/summary" element={<ReviewSummary />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/search" element={<Search />} />
          <Route path="/subjects/:id" element={<SubjectDetails />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/authenticate"
            element={<Navigate replace to="/home" />}
          />
        </Routes>
      </AnimatePresence>
    </Router>
  );
};
