import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";

export function useTabBarVisibility() {
  const location = useLocation();
  const isSessionInProgress = useAssignmentQueueStore.use.sessionInProgress();
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  useEffect(() => {
    let subjDetailsRegex = new RegExp("/subjects/*");
    if (isSessionInProgress && subjDetailsRegex.test(location.pathname)) {
      // *testing
      console.log("Session in progress, hide tab bar");
      // *testing
      setIsTabBarVisible(false);
    } else {
      // *testing
      console.log("Showing tab bar");
      // *testing
      setIsTabBarVisible(true);
    }
  }, [location.pathname]);

  return isTabBarVisible;
}
