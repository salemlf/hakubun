import { groupDataByProperty } from "../../utils";
import { Subject } from "../../types/Subject";
import SubjCharacterList from "./SubjCharacterList";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";

type Props = {
  queueItems: AssignmentQueueItem[];
};

// TODO: need updated srs level data to display actual info, test with fake data for now
function GroupedReviewSummaryResults({ queueItems }: Props) {
  let subjectsByLevel = groupDataByProperty(queueItems, "level");
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
    <SubjCharacterList
      subjList={queueItems as Subject[]}
      justify="flex-start"
    />
  );
}

export default GroupedReviewSummaryResults;
