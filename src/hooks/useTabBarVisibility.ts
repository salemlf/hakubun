import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";

export function useTabBarVisibility() {
  const location = useLocation();
  const isSessionInProgress = useAssignmentQueueStore.use.sessionInProgress();
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  useEffect(() => {
    let subjDetailsRegex = new RegExp("/subjects/*");
    if (subjDetailsRegex.test(location.pathname) && isSessionInProgress) {
      // *testing
      console.log("Session in progress, hide tab bar");
      // *testing
      setIsTabBarVisible(false);
    } else {
      console.log("Showing tab bar");
      setIsTabBarVisible(true);
    }
  }, [location.pathname]);

  return isTabBarVisible;
}
