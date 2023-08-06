import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import TokenInput from "../pages/TokenInput";

// TODO: change so no need to specify every route to redirect from
export const AuthStack = () => {
  return (
    <Router>
      <Route path="/authenticate">
        <TokenInput />
      </Route>
      <Route path="/" element={<Navigate replace to="/authenticate" />} />
      <Route path="/home" element={<Navigate replace to="/authenticate" />} />
      <Route
        path="/subject"
        element={<Navigate replace to="/authenticate" />}
      />
      <Route path="/search" element={<Navigate replace to="/authenticate" />} />
      <Route path="/review" element={<Navigate replace to="/authenticate" />} />
    </Router>
  );
};
