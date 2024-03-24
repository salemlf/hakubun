import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { motion, useAnimation } from "framer-motion";
import { assignmentKeys } from "../../hooks/assignments/assignmentsKeyFactory";
import Button from "../Button";
import RefreshIcon from "../../images/refresh.svg";
import styled from "styled-components";

const refreshingVariants = {
  hidden: { rotate: 0, marginTop: 0, marginBottom: 0 },
  spin: { rotate: -360, transition: { duration: 2, repeat: Infinity } },
  complete: { rotate: 0, marginTop: 0, marginBottom: 0 },
};

const RefreshButton = styled(Button)`
  border-radius: 12px;
  padding: 5px;
`;

const RefreshImg = styled(motion.img)`
  width: 2.75em;
  height: 2.75em;
`;

function RefreshHomeButton() {
  const queryClient = useQueryClient();
  const [lastTimeRefreshed, setLastTimeRefreshed] = useState<
    Date | undefined
  >();
  const controls = useAnimation();

  const refresh = () => {
    queryClient.invalidateQueries({
      queryKey: assignmentKeys.allAvailable(),
    });
  };

  const refreshIfTimeElapsed = () => {
    let currTime = new Date();
    if (lastTimeRefreshed === undefined) {
      setLastTimeRefreshed(currTime);
      refresh();
      return;
    }

    let timeDiff = (currTime.getTime() - lastTimeRefreshed.getTime()) / 60000;
    // *testing
    console.log(
      "🚀 ~ file: RefreshHomeButton.tsx:49 ~ refreshIfTimeElapsed ~ timeDiff:",
      timeDiff
    );
    // *testing

    // if it's been more than a minute, refresh
    // TODO: otherwise, show a toast letting user know they can't refresh yet
    if (timeDiff >= 1) {
      refresh();
    }
  };

  const onButtonClick = () => {
    // controls.start("refreshing");
    controls.start("spin");
    refreshIfTimeElapsed();

    setTimeout(() => {
      controls.start("complete");
    }, 3000);
  };

  return (
    <RefreshButton
      onPress={onButtonClick}
      backgroundColor="transparent"
      aria-label="Refresh lesson and review data"
    >
      <RefreshImg
        initial="hidden"
        animate={controls}
        src={RefreshIcon}
        variants={refreshingVariants}
      />
    </RefreshButton>
  );
}

export default RefreshHomeButton;
