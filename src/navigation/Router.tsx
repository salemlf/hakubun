import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { useUserAuth } from "../contexts/AuthContext";
import { Loading } from "../components/Loading";

const Router = () => {
  const { authLoading, isAuthenticated } = useUserAuth();

  if (authLoading) {
    return <Loading />;
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
};

export default Router;
