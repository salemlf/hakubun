// import { AppStack } from "./AppStack";
// import { AuthStack } from "./AuthStack";
import { appRouter } from "./AppStack";
import { authRouter } from "./AuthStack";
import { useUserAuth } from "../contexts/AuthContext";
import Loading from "../components/Loading/Loading";
import { RouterProvider } from "react-router-dom";

// TODO: change so protected routes are rendered in react router v6 way
const Router = () => {
  const { authLoading, isAuthenticated } = useUserAuth();

  if (authLoading) {
    return <Loading />;
  }

  // return isAuthenticated ? <AppStack /> : <AuthStack />;
  return <RouterProvider router={isAuthenticated ? appRouter : authRouter} />;
  // <RouterProvider router={authRouter} />
};

export default Router;
