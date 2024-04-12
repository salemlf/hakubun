import { useEffect, useState } from "react";
import { useBlocker, BlockerFunction } from "react-router-dom";

export const useNavBlocker = (shouldBlock: BlockerFunction) => {
  const blocker = useBlocker(shouldBlock);

  // resetting the blocker if it's somehow already blocked
  useEffect(() => {
    cancelNavigating();
  }, []);

  const [isNavBlocked, setIsNavBlocked] = useState(blocker.state === "blocked");
  useEffect(() => {
    setIsNavBlocked(blocker.state === "blocked");
  }, [blocker.state]);

  const proceedNavigating = () => {
    if (blocker && blocker.state === "blocked") {
      blocker.proceed();
    }
  };

  const cancelNavigating = () => {
    if (blocker && blocker.state === "blocked") {
      blocker.reset();
    }
  };

  return { isNavBlocked, proceedNavigating, cancelNavigating };
};
