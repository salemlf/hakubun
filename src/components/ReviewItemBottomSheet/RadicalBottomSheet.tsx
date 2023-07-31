import { BottomSheetSubjectProps } from "../../types/ReviewSessionTypes";
import { Radical, Subject } from "../../types/Subject";
import SubjectMeanings from "../SubjectMeanings/SubjectMeanings";
import RadicalNameMnemonic from "../RadicalNameMnemonic/RadicalNameMnemonic";
import { TabData } from "../../types/MiscTypes";
import { BottomSheetContent } from "../../styles/BaseStyledComponents";
import SwipeableTabs from "../SwipeableTabs";

function RadicalBottomSheet({
  reviewItem,
  selectedTabKey,
  setSelectedTabKey,
  tabBgColor,
  tabSelectionColor,
}: BottomSheetSubjectProps) {
  const tabs: TabData[] = [
    {
      id: "meaning",
      label: "Meaning",
      tabContents: (
        <BottomSheetContent>
          <SubjectMeanings
            subject={reviewItem as Subject}
            showPrimaryMeaning={true}
          />
          <RadicalNameMnemonic radical={reviewItem as Radical} />
        </BottomSheetContent>
      ),
    },
  ];

  return (
    <SwipeableTabs
      tabs={tabs}
      selectedTabKey={selectedTabKey}
      setSelectedTabKey={setSelectedTabKey}
      tabBgColor={tabBgColor}
      tabSelectionColor={tabSelectionColor}
    />
  );
}

export default RadicalBottomSheet;
