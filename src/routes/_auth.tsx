import { forwardRef, useContext, useEffect, useRef } from "react";
import { App as CapacitorApp } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import {
  createFileRoute,
  getRouterContext,
  Outlet,
  redirect,
  useLocation,
  useMatch,
  useMatches,
  useRouter,
} from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AnimatePresence, useIsPresent } from "framer-motion";
import { cloneDeep } from "lodash";
import useAssignmentQueueStoreFacade from "../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { useAuth } from "../hooks/useAuth";
import FloatingTabBar from "../components/FloatingTabBar";
import LoadingDots from "../components/LoadingDots";
import {
  containerVariants,
  FixedCenterContainer,
  PageContainer,
} from "../styles/BaseStyledComponents";

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

// TODO: add onError handler
export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/authenticate",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <Auth />,
});

function Auth() {
  const routerLocation = useLocation();
  const { history } = useRouter();
  const { sessionInProgress: isSessionInProgress } =
    useAssignmentQueueStoreFacade();
  const { isAuthLoading } = useAuth();

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

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      CapacitorApp.addListener("backButton", ({ canGoBack }) => {
        if (!canGoBack) {
          CapacitorApp.exitApp();
        } else {
          history.go(-1);
        }
      });
    }
    return () => {
      CapacitorApp.removeAllListeners();
    };
  }, [history]);

  if (isAuthLoading) {
    return (
      <FixedCenterContainer>
        <LoadingDots />
      </FixedCenterContainer>
    );
  }

  return (
    <>
      <AnimatePresence mode="popLayout">
        <AnimatedOutlet key={nextMatch.id} />
      </AnimatePresence>
      <AnimatePresence>
        {shouldShowTabBar && <FloatingTabBar />}
      </AnimatePresence>
      {/* <TanStackRouterDevtools /> */}
    </>
  );
}
