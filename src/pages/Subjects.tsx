import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LEVELS } from "../constants";
import SwipeableTabs from "../components/SwipeableTabs";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import SubjectsOnLvlTab from "../components/SubjectsOnLvlTab/SubjectsOnLvlTab";
import LoadingDots from "../components/LoadingDots";
import {
  ContentWithTabBarNoPadding,
  FixedCenterContainer,
  Header,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";
import Paginator from "../components/Paginator";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

const SubjectsHeader = styled(Header)`
  color: black;
  text-align: center;
`;

const Content = styled(ContentWithTabBarNoPadding)`
  /* height: 100%; */
`;

export const Subjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [level, setLevel] = useState<number>(0);
  console.log("🚀 ~ file: Subjects.tsx:30 ~ Subjects ~ user:", user);
  console.log("🚀 ~ file: Subjects.tsx:33 ~ Subjects ~ isLoading:", isLoading);

  useEffect(() => {
    if (user && user.level) {
      setLevel(user.level);
      setIsLoading(false);
      console.log("USER LEVEL: ", user.level);
    } else {
      setIsLoading(true);
    }
  }, [user, user?.level]);

  return (
    <>
      <Page>
        {isLoading ? (
          // <p>Loading...</p>
          <FixedCenterContainer>
            <LoadingDots />
          </FixedCenterContainer>
        ) : (
          <SubjectsContent level={level} />
        )}
      </Page>
      <FloatingTabBar />
    </>
  );
};

type SubjectsContentProps = {
  level: number;
};
const SubjectsContent = ({ level }: SubjectsContentProps) => {
  // const [selectedTabKey, setSelectedTabKey] = useState<string>(
  //   level.toString()
  // );
  // !added
  const [[currentPage, direction], setCurrentPage] = useState([level, 0]);
  const levelPages = LEVELS.map((levelPg) => (
    <SubjectsOnLvlTab
      key={levelPg}
      level={levelPg}
      isSelected={currentPage === levelPg}
    />
  ));
  console.log(
    "🚀 ~ file: Subjects.tsx:79 ~ SubjectsContent ~ levelPages:",
    levelPages
  );
  console.log(
    "🚀 ~ file: Subjects.tsx:71 ~ SubjectsContent ~ currentPage:",
    currentPage
  );
  // !added

  return (
    // <Content>
    <>
      <SubjectsHeader bgcolor="var(--ion-color-primary-tint)">
        Level
      </SubjectsHeader>
      {/* <SwipeableTabs
        tabFontSize="1.5rem"
        tabBgColor="var(--ion-color-primary-tint)"
        roundedContainer={false}
        selectedTabKey={selectedTabKey}
        setSelectedTabKey={setSelectedTabKey}
        tabs={LEVELS.map((level) => {
          return {
            key: level.toString(),
            id: level.toString(),
            label: `${level}`,
            tabContents: (
              <SubjectsOnLvlTab
              key={level}
              level={level}
              isSelected={selectedTabKey === level.toString()}
              />
              ),
            };
        })}
        defaultValue={level.toString()}
      /> */}
      <Paginator
        typeOfPaginator="tabs"
        pageArr={levelPages}
        currentPage={currentPage}
        direction={direction}
        setCurrentPage={setCurrentPage}
      />
    </>
    // </Content>
  );
};
