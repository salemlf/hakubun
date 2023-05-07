import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";
import { useAuth } from "../contexts/AuthContext";
import { Loading } from "../components/Loading";

const Router = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }
  return auth ? <AppStack /> : <AuthStack />;
};

export default Router;
