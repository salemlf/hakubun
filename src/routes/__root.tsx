import { forwardRef, useContext, useRef } from "react";
import {
  createRootRoute,
  getRouterContext,
  Outlet,
  useLocation,
  useMatch,
  useMatches,
} from "@tanstack/react-router";
import { cloneDeep } from "lodash";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import FloatingTabBar from "../components/FloatingTabBar";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import styled from "styled-components";

export const Route = createRootRoute({
  component: Root,
});

const PageContainer = styled(motion.div)`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  position: relative;
  background-size: cover;
  background-color: var(--background-color);
  overflow-y: auto;
`;

const containerVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
  const RouterContext = getRouterContext();
  const routerContext = useContext(RouterContext);
  const renderedContext = useRef(routerContext);
  const isPresent = useIsPresent();

  if (isPresent) {
    renderedContext.current = cloneDeep(routerContext);
  }

  return (
    <PageContainer
      ref={ref}
      initial="initial"
      animate="in"
      exit="out"
      variants={containerVariants}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <RouterContext.Provider value={renderedContext.current}>
        <Outlet />
      </RouterContext.Provider>
    </PageContainer>
  );
});

function Root() {
  const routerLocation = useLocation();
  const { sessionInProgress: isSessionInProgress } =
    useAssignmentQueueStoreFacade();

  const pgsToShowTabBar = ["/", "/search", "/subjects"];
  const subjectDetailsPgRegex = /\/subjects\/\d+/;
  const shouldShowTabBar =
    pgsToShowTabBar.includes(routerLocation.pathname) ||
    (!isSessionInProgress &&
      subjectDetailsPgRegex.test(routerLocation.pathname));

  const matches = useMatches();
  const match = useMatch({ strict: false });
  const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  const nextMatch = matches[nextMatchIndex];

  return (
    <>
      <AnimatePresence mode="popLayout">
        <AnimatedOutlet key={nextMatch.id} />
      </AnimatePresence>
      <AnimatePresence>
        {shouldShowTabBar && <FloatingTabBar />}
      </AnimatePresence>
    </>
  );
}
