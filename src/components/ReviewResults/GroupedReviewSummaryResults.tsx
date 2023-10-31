import { groupDataByProperty } from "../../utils";
import { getSrsStageNameByNum } from "../../services/SubjectAndAssignmentService";
import { Subject } from "../../types/Subject";
import { AssignmentQueueItem } from "../../types/AssignmentQueueTypes";
import SubjectButtonList from "../SubjectButtonList";
import { Assignment } from "../../types/Assignment";
import styled from "styled-components";

const HeaderAndGroupedItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: baseline;
  &:not(:last-child) {
    margin-bottom: 15px;
  }
`;

const LvlAndSrsStage = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const SrsStageName = styled.p`
  margin: 5px 0;
  text-transform: capitalize;
`;

const HorizontalRule = styled.hr`
  height: 2px;
  margin: 1px 0 8px 0;
  width: 100%;
  background-color: white;
`;

const LvlGroup = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--ion-color-secondary);
  font-size: 1.125rem;
  margin: 0;
  color: white;
  padding: 6px;
  line-height: 1.3;
  border-radius: 12px;
`;

type QueueItemsGrouped = Record<string, AssignmentQueueItem[]>;

type LevelGroupProps = {
  level: string;
  items: AssignmentQueueItem[];
};

const LevelGroup = ({ level, items }: LevelGroupProps) => {
  let groupedBySRS: QueueItemsGrouped = groupDataByProperty(
    items,
    "ending_srs_stage"
  );

  const convertToSubjects = (items: AssignmentQueueItem[]): Subject[] => {
    return items.map((item) => {
      return {
        ...item,
        id: item.subject_id,
      };
    });
  };

  const convertToAssignments = (items: AssignmentQueueItem[]): Assignment[] => {
    return items.map((item) => {
      return {
        ...item,
        id: item.assignment_id,
      };
    });
  };

  return (
    <>
      {Object.entries(groupedBySRS).map(([key, value]) => (
        <HeaderAndGroupedItems key={key}>
          <LvlAndSrsStage>
            <LvlGroup>Level {level}</LvlGroup>
            <SrsStageName>{getSrsStageNameByNum(parseInt(key))}</SrsStageName>
          </LvlAndSrsStage>
          <HorizontalRule />
          <SubjectButtonList
            subjList={convertToSubjects(value) as Subject[]}
            btnSize="sm"
            justify="flex-start"
            assignmentList={convertToAssignments(value) as Assignment[]}
            allowVocab={true}
            showDetails={false}
          />
        </HeaderAndGroupedItems>
      ))}
    </>
  );
};

type Props = {
  queueItems: AssignmentQueueItem[];
};

function GroupedReviewSummaryResults({ queueItems }: Props) {
  let queueItemsByLevel: QueueItemsGrouped = groupDataByProperty(
    queueItems,
    "level"
  );

  return (
    <>
      {Object.entries(queueItemsByLevel).map(([key, value]) => (
        <LevelGroup key={key} level={key} items={value} />
      ))}
    </>
  );
}

export default GroupedReviewSummaryResults;
