import * as NavigationMenu from "@radix-ui/react-navigation-menu";
// TODO: change so relying on IonIcon
import { IonIcon } from "@ionic/react";
import HomeIcon from "../../images/home.svg";
import SubjectsIcon from "../../images/subjects.svg";
import SearchIcon from "../../images/search.svg";
import styled from "styled-components/macro";

const TabBarContainer = styled(NavigationMenu.Root)`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  justify-content: center;
  width: 65%;
  min-width: 200px;
  max-width: 500px;
`;

const TabList = styled(NavigationMenu.List)`
  background-color: var(--ion-color-secondary);
  display: flex;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 30px;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 8px;
  margin: 0;
  gap: 5px;
`;

const TabButton = styled(NavigationMenu.Link)`
  display: block;
  text-decoration: none;
  padding: 8px 12px;
  outline: none;
  user-select: none;
  font-weight: 500;
  line-height: 1;
  border-radius: 30px;
  font-size: 15px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;

  & > * {
    flex: 0 0 100%;
  }

  ion-icon {
    width: 1.5em;
    height: 1.5em;
  }

  &:focus {
    outline: 2px solid white;
  }
`;

const TabLabel = styled.p`
  font-size: 1rem;
  margin: 0;
  text-align: center;
`;

// TODO: view client-side routing info: https://www.radix-ui.com/docs/primitives/components/navigation-menu#with-client-side-routing
function FloatingTabBar() {
  return (
    <TabBarContainer>
      <TabList>
        <NavigationMenu.Item>
          <TabButton href="#">
            <IonIcon src={SubjectsIcon} />
            <TabLabel>Subjects</TabLabel>
          </TabButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TabButton href="#">
            <IonIcon src={HomeIcon} />
            <TabLabel>Home</TabLabel>
          </TabButton>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <TabButton href="#">
            <IonIcon src={SearchIcon} />
            <TabLabel>Search</TabLabel>
          </TabButton>
        </NavigationMenu.Item>
      </TabList>
    </TabBarContainer>
  );
}

export default FloatingTabBar;
