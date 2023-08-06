import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import TokenInput from "../pages/TokenInput";

// TODO: change so no need to specify every route to redirect from
export const AuthStack = () => {
  return (
    <Router>
      <AuthRoutes />
    </Router>
  );
};

const AuthRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/authenticate" element={<TokenInput />} />
        <Route path="/" element={<Navigate replace to="/authenticate" />} />
        <Route path="/home" element={<Navigate replace to="/authenticate" />} />
        <Route
          path="/subject"
          element={<Navigate replace to="/authenticate" />}
        />
        <Route
          path="/search"
          element={<Navigate replace to="/authenticate" />}
        />
        <Route
          path="/review"
          element={<Navigate replace to="/authenticate" />}
        />
      </Routes>
    </AnimatePresence>
  );
};
