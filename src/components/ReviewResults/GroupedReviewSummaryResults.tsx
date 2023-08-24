import { IonRow } from "@ionic/react";
import { Subject } from "../../types/Subject";
import { groupDataByProperty } from "../../services/ReviewService";
import SubjCharacterList from "./SubjCharacterList";

type Props = {
  subjData: Subject[];
};

// TODO: need updated srs level data to display actual info, test with fake data for now
function GroupedReviewSummaryResults({ subjData }: Props) {
  let subjectsByLevel = groupDataByProperty(subjData, "level");
  console.log(
    "🚀 ~ file: SummaryDataGrouped.tsx:12 ~ SummaryDataGrouped ~ subjectsByLevel:",
    subjectsByLevel
  );

  // TODO: use below method to loop over items, creating subjgroups using SRS level
  let dataGroupedByLevelAndSRS = [];
  for (const level in subjectsByLevel) {
    console.log(`Level: ${level}: `, subjectsByLevel[level]);

    // TODO: need assignment data to group this
    let groupedBySRS = groupDataByProperty(subjectsByLevel[level], "srs_stage");
  }

  return (
    <IonRow>
      <SubjCharacterList subjList={subjData} justify="flex-start" />
    </IonRow>
  );
}

export default GroupedReviewSummaryResults;
