import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import SvgIcon from "../SvgIcon";
import HomeIcon from "../../images/home.svg?react";
import SubjectsIcon from "../../images/subjects.svg?react";
import SearchIcon from "../../images/search.svg?react";
import styled from "styled-components";

// TODO: change to this once no longer using IonPage
const TabBarContainer = styled(motion(NavigationMenu.Root))`
  width: 80%;
  min-width: 200px;
  max-width: 500px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(constant(safe-area-inset-top) + 16px);
  bottom: calc(env(safe-area-inset-top) + 16px);
  z-index: 12;
`;

const TabList = styled(NavigationMenu.List)`
  background-color: var(--ion-color-secondary);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 6px 10px;
  border-radius: 30px;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 8px;
  margin: 0;
  gap: 5px;
`;

const TabButton = styled(NavigationMenu.Link)`
  display: block;
  text-decoration: none;
  padding: 10px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 25px;
  font-size: 15px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;

  & > * {
    flex: 0 0 100%;
  }

  &:focus-visible {
    outline: 2px solid white;
  }

  &.active {
    background-color: var(--ion-color-secondary-dark);
  }
`;

const TabLabel = styled.p`
  font-size: 1rem;
  margin: 0;
  text-align: center;
`;

type PageLinkProps = {
  pathName: string;
  pageName: string;
  children: React.ReactNode;
};

const PageLink = ({
  pathName,
  pageName,
  children,
  ...props
}: PageLinkProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // TODO: make this match subpaths also
  const isActive = currentPath === pathName;
  return (
    <TabButton
      asChild
      active={isActive}
      {...props}
      aria-label={`${pageName} page`}
    >
      <NavLink to={pathName}>{children}</NavLink>
    </TabButton>
  );
};

function FloatingTabBar() {
  return (
    <TabBarContainer exit={{ y: -150 }} transition={{ type: "spring" }}>
      <TabList>
        <NavigationMenu.Item>
          <PageLink pathName="/subjects" pageName="Subjects">
            <SvgIcon
              icon={<SubjectsIcon />}
              width="1.5em"
              height="1.5em"
              iconColor="white"
            />
            <TabLabel>Subjects</TabLabel>
          </PageLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <PageLink pathName="/" pageName="Home">
            <SvgIcon
              icon={<HomeIcon />}
              width="1.5em"
              height="1.5em"
              iconColor="white"
            />
            <TabLabel>Home</TabLabel>
          </PageLink>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <PageLink pathName="/search" pageName="Search">
            <SvgIcon
              icon={<SearchIcon />}
              width="1.5em"
              height="1.5em"
              iconColor="white"
            />
            <TabLabel>Search</TabLabel>
          </PageLink>
        </NavigationMenu.Item>
      </TabList>
    </TabBarContainer>
  );
}

export default FloatingTabBar;
