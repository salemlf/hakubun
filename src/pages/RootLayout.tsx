// import { forwardRef, useContext, useRef } from "react";
// import {
//   getRouterContext,
//   Outlet,
//   useMatch,
//   useMatches,
// } from "@tanstack/react-router";
// import {
//   AnimatePresence,
//   motion,
//   useIsPresent,
//   useWillChange,
// } from "framer-motion";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// import styled from "styled-components";

// const PageContainer = styled(motion.div)`
//   display: grid;
//   grid-template-rows: auto 1fr auto;
//   min-height: 100dvh;
//   position: relative;
//   background-size: cover;
//   background-color: var(--background-color);
//   overflow-y: auto;
// `;

// const containerVariants = {
//   initial: { opacity: 0, y: 20 },
//   in: { opacity: 1, y: 0 },
//   out: { opacity: 0, y: -20 },
// };

// const AnimatedOutlet = forwardRef<HTMLDivElement>((_, ref) => {
//   const RouterContext = getRouterContext();
//   const routerContext = useContext(RouterContext);
//   const renderedContext = useRef(routerContext);
//   const isPresent = useIsPresent();
//   const willChange = useWillChange();

//   if (isPresent) {
//     // renderedContext.current = cloneDeep(routerContext);
//     // TODO: ensure routerContext doesn't have any functions, otherwise need to use lodash cloneDeep
//     const clonedContext = JSON.parse(JSON.stringify(routerContext));
//     console.log("🚀 ~ AnimatedOut ~ clonedContext:", clonedContext);
//     renderedContext.current = clonedContext;
//   }

//   return (
//     <PageContainer
//       ref={ref}
//       initial="initial"
//       animate="in"
//       exit="out"
//       variants={containerVariants}
//       transition={{ duration: 0.5, delay: 0.1 }}
//       style={{ willChange }}
//     >
//       <RouterContext.Provider value={renderedContext.current}>
//         <Outlet />
//         <TanStackRouterDevtools />
//       </RouterContext.Provider>
//     </PageContainer>
//   );
// });

// function Root() {
//   const matches = useMatches();
//   //   *testing
//   console.log("🚀 ~ Root ~ matches:", matches);
//   //   *testing
//   const match = useMatch({ strict: false });
//   const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
//   console.log("🚀 ~ Root ~ nextMatchIndex:", nextMatchIndex);
//   const nextMatch = matches[nextMatchIndex];

//   return (
//     <>
//       <AnimatePresence mode="popLayout">
//         <AnimatedOutlet key={nextMatch.id} />
//       </AnimatePresence>
//     </>
//   );
// }

// export default Root;

import { forwardRef, useContext, useRef } from "react";
import {
  getRouterContext,
  Outlet,
  useLocation,
  useMatch,
  useMatches,
} from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useWillChange,
} from "framer-motion";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import styled from "styled-components";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import FloatingTabBar from "../components/FloatingTabBar";

// const PageContainer = styled(motion.div)`
const PageContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
  position: relative;
  background-size: cover;
  background-color: var(--background-color);
  overflow-y: auto;
`;

function Root() {
  //   const matches = useMatches();
  //   //   *testing
  //   console.log("🚀 ~ Root ~ matches:", matches);
  //   //   *testing
  //   const match = useMatch({ strict: false });
  //   const nextMatchIndex = matches.findIndex((d) => d.id === match.id) + 1;
  //   console.log("🚀 ~ Root ~ nextMatchIndex:", nextMatchIndex);
  //   const nextMatch = matches[nextMatchIndex];

  const routerLocation = useLocation();
  const { sessionInProgress: isSessionInProgress } =
    useAssignmentQueueStoreFacade();

  const pgsToShowTabBar = ["/", "/search", "/subjects"];
  const subjectDetailsPgRegex = /\/subjects\/\d+/;

  const shouldShow =
    pgsToShowTabBar.includes(routerLocation.pathname) ||
    (!isSessionInProgress &&
      subjectDetailsPgRegex.test(routerLocation.pathname));

  return (
    <PageContainer>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
      <AnimatePresence>{shouldShow && <FloatingTabBar />}</AnimatePresence>
    </PageContainer>
  );
}

export default Root;
