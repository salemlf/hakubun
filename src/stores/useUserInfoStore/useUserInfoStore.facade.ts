import { useShallow } from "zustand/react/shallow";
import {
  UserInfoState,
  UserInfoActions,
  useUserInfoStore,
  initialState,
} from "./useUserInfoStore";

// using facade pattern, cleaner to use in components and easier to replace zustand in future if necessary
const useUserInfoStoreFacade = () => {
  const { userInfo, setUserInfo, reset }: UserInfoState & UserInfoActions =
    useUserInfoStore(
      useShallow((state: UserInfoState & UserInfoActions) => ({
        userInfo: state.userInfo,
        setUserInfo: state.setUserInfo,
        reset: state.reset,
      }))
    );

  return {
    userInfo,
    setUserInfo,
    reset,
    // exporting to check that state is reset properly
    initialState,
  };
};

export default useUserInfoStoreFacade;
