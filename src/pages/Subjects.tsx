import { useEffect, useState } from "react";
import { useUserInfoStore } from "../stores/useUserInfoStore";
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
  const userInfo = useUserInfoStore.use.userInfo();
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    if (userInfo && userInfo.level) {
      setLevel(userInfo.level);
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [userInfo, userInfo?.level]);

  return (
    <>
      <Page>
        {isLoading ? (
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
  const [selectedTabKey, setSelectedTabKey] = useState<string>(
    level.toString()
  );

  return (
    <ContentWithTabBarNoPadding>
      <SubjectsHeader bgcolor="var(--ion-color-primary-tint)">
        Level
      </SubjectsHeader>
      <SwipeableTabs
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
      />
    </ContentWithTabBarNoPadding>
  );
};
