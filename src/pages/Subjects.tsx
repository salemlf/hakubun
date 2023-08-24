import { useState } from "react";
import { LEVELS, TEMP_LEVELS } from "../constants";
import SwipeableTabs from "../components/SwipeableTabs";
import AnimatedPage from "../components/AnimatedPage";
import FloatingTabBar from "../components/FloatingTabBar";
import SubjectsOnLvlTab from "../components/SubjectsOnLvlTab/SubjectsOnLvlTab";
import { ContentWithTabBar, Header } from "../styles/BaseStyledComponents";
import styled from "styled-components";

const Page = styled(AnimatedPage)`
  --ion-background-color: var(--dark-greyish-purple);
  background-color: var(--dark-greyish-purple);
`;

const SubjectsHeader = styled(Header)`
  text-align: center;
`;

export const Subjects = () => {
  const [selectedTabKey, setSelectedTabKey] = useState<string>("1");

  return (
    <>
      <Page>
        <ContentWithTabBar>
          <SubjectsHeader bgcolor="var(--ion-color-primary)">
            Level
          </SubjectsHeader>
          <SwipeableTabs
            tabFontSize="1.5rem"
            tabBgColor="var(--ion-color-primary)"
            roundedContainer={false}
            selectedTabKey={selectedTabKey}
            setSelectedTabKey={setSelectedTabKey}
            tabs={TEMP_LEVELS.map((level) => {
              return {
                id: level.toString(),
                label: `${level}`,
                tabContents: (
                  <SubjectsOnLvlTab
                    level={level}
                    isSelected={selectedTabKey === level.toString()}
                  />
                ),
              };
            })}
            defaultValue="1"
          />
        </ContentWithTabBar>
      </Page>
      <FloatingTabBar />
    </>
  );
};
