import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { LEVELS } from "../constants";
import SwipeableTabs from "../components/SwipeableTabs";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import SubjectsOnLvlTab from "../components/SubjectsOnLvlTab/SubjectsOnLvlTab";
import {
  ContentWithTabBar,
  ContentWithTabBarNoPadding,
  Header,
} from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

const SubjectsHeader = styled(Header)`
  color: black;
  text-align: center;
`;

export const Subjects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    if (user && user.level) {
      setLevel(user.level);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [user, user?.level]);

  return (
    <>
      <Page>
        {isLoading ? <p>Loading...</p> : <SubjectsContent level={level} />}
      </Page>
      <FloatingTabBar />
    </>
  );
};

type SubjectsContentProps = {
  level: number;
};
const SubjectsContent = ({ level }: SubjectsContentProps) => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>(
    level.toString()
  );

  return (
    <ContentWithTabBarNoPadding>
      <SubjectsHeader bgcolor="var(--ion-color-primary)">Level</SubjectsHeader>
      <SwipeableTabs
        tabFontSize="1.5rem"
        tabBgColor="var(--ion-color-primary)"
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
      />
    </ContentWithTabBarNoPadding>
  );
};
