import { Redirect } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TokenInput from "../pages/TokenInput";

// TODO: change so no need to specify every route to redirect from?
export const AuthStack = () => {
  return (
    <Router>
      <Route exact path="/authenticate" component={TokenInput} />
      <Redirect from="/" to="/authenticate" exact />
      <Redirect from="/home" to="/authenticate" />
      <Redirect from="/subject" to="/authenticate" />
      <Redirect from="/search" to="/authenticate" />
      <Redirect from="/review" to="/authenticate" />
    </Router>
  );
};
