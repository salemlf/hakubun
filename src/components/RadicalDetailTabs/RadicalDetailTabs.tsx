import { ReviewQueueItem } from "../../types/ReviewSessionTypes";
import { Radical, Subject } from "../../types/Subject";
import RadicalNameMnemonic from "../RadicalNameMnemonic";
import SubjectMeanings from "../SubjectMeanings";
import SwipeableTabs from "../SwipeableTabs";
import { SubjDetailTabContainer } from "../../styles/SubjectDetailsStyled";

type Props = {
  radical: ReviewQueueItem;
  scrollToDefault: boolean;
};

function RadicalDetailTabs({ radical, scrollToDefault }: Props) {
  return (
    <SwipeableTabs
      tabs={[
        {
          id: "name",
          label: "Name",
          tabContents: (
            <SubjDetailTabContainer>
              <SubjectMeanings
                subject={radical as Subject}
                showPrimaryMeaning={true}
              />
              <RadicalNameMnemonic radical={radical as Radical} />
            </SubjDetailTabContainer>
          ),
        },
      ]}
      defaultValue="name"
      scrollToDefault={scrollToDefault}
    />
  );
}

export default RadicalDetailTabs;
