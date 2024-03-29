import { useEffect, useState } from "react";
import { sortAssignmentsByAvailableDate } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import useForecastTotalsStoreFacade from "../../stores/useForecastTotalsStore/useForecastTotalsStore.facade";
import { useAssignmentsAvailableInRange } from "../../hooks/assignments/useAssignmentsAvailableInRange";
import { Assignment } from "../../types/Assignment";
import LoadingDots from "../LoadingDots";
import { LoadingContainer } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const ChartContainer = styled.section`
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  grid-template-rows: 1fr auto;
  gap: 10px;
  grid-auto-flow: row;
  padding: 10px;
  color: var(--text-color);
`;

const BasicGrid = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 0.5em 0;
  align-items: center;
  margin: 0;
  padding: 0;
  grid-auto-columns: 1fr;
`;

// TODO: just use BasicGrid
const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 0.5em 0;
  align-items: center;
  margin: 0;
  padding: 0;
  grid-auto-columns: 1fr;
`;

const ReviewTimeLabel = styled.label`
  grid-column-start: 1;
  grid-column-end: 2;
`;

const ChartList = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: auto;
  gap: 0.5em 0;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
  grid-auto-columns: 1fr;
  border-left: 3px solid var(--ion-color-primary);
`;

type NumReviewsBarProps = {
  gridcolspan: number;
};

const ReviewsBar = styled.li<NumReviewsBarProps>`
  background: var(--ion-color-tertiary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  grid-column-start: 1;
  grid-column-end: ${({ gridcolspan }) => `span ${gridcolspan}`};
  border-radius: 0 12px 12px 0;
  border: 1px solid black;
  border-left: none;
  height: 1rem;
`;

// TODO: just use BasicGrid
const NumReviewsTxtContainer = styled(BasicGrid)`
  border-right: 3px solid var(--ion-color-primary);
  padding-right: 10px;
`;

const NumberTxt = styled.p`
  margin: 0;
`;

const TotalForDay = styled(NumberTxt)`
  grid-column-start: 3;
  grid-column-end: 4;
  text-decoration-line: underline;
  text-decoration-style: double;
`;

type ReviewsByHourData = {
  [key: string]: Assignment[];
};

const get12HourFormat = (date: Date): string => {
  const hours = date.getHours();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}${amOrPm}`;
};

const calculateDailyReviewInfo = (
  sortedAssignments: Assignment[],
  numAssignmentsAlreadyAvailable: number
) => {
  const groupedByHour = sortedAssignments.reduce(
    (group: ReviewsByHourData, assignment: Assignment) => {
      if (assignment.available_at !== null) {
        const hour = get12HourFormat(new Date(assignment.available_at));
        group[hour] = group[hour] ?? [];

        group[hour].push(assignment);
      }
      return group;
    },
    {}
  );

  const cumulativeSum = (
    (sum) => (hour: any) =>
      (sum += groupedByHour[hour].length)
  )(numAssignmentsAlreadyAvailable);

  const dayTotal = Object.keys(groupedByHour).reduce((sum, hour) => {
    return sum + groupedByHour[hour].length;
  }, 0);

  const sumByHour = Object.keys(groupedByHour).map(cumulativeSum);

  return {
    groupedByHour,
    dayTotal,
    sumByHour,
  };
};

type Props = {
  startDateIsoString: string;
  endDateIsoString: string;
  index: number;
};

// TODO: don't like mapping over same items three times, try to improve
function DailyReviewForecast({
  startDateIsoString,
  endDateIsoString,
  index,
}: Props) {
  const {
    runningTotalAvailableReviews: runningTotals,
    updateRunningTotalAvailableReviews,
  } = useForecastTotalsStoreFacade();
  const enabled = runningTotals[index] !== undefined;

  const [isLoading, setIsLoading] = useState(true);
  const [reviewsByHour, setReviewsByHour] = useState<ReviewsByHourData>({});
  const [totalForDay, setTotalForDay] = useState<number>(0);
  const [sumReviewsByHour, setSumReviewsByHour] = useState<number[]>([]);

  const { isLoading: assignmentLoading, data: assignments } =
    useAssignmentsAvailableInRange(
      startDateIsoString,
      endDateIsoString,
      enabled
    );

  useEffect(() => {
    if (!assignmentLoading && assignments && enabled) {
      updateRunningTotalAvailableReviews(assignments.length, index);

      const sortedAssignments = sortAssignmentsByAvailableDate(
        assignments,
        "asc"
      );

      const reviewCalculations = calculateDailyReviewInfo(
        sortedAssignments,
        runningTotals[index]
      );

      setReviewsByHour(reviewCalculations.groupedByHour);
      setSumReviewsByHour(reviewCalculations.sumByHour);
      setTotalForDay(reviewCalculations.dayTotal);

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [assignmentLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <LoadingDots size="sm" />
        </LoadingContainer>
      ) : (
        <ChartContainer>
          <LabelContainer>
            {Object.keys(reviewsByHour).map((keyName, index) => (
              <ReviewTimeLabel htmlFor={keyName} key={`${keyName}-${index}`}>
                {keyName}
              </ReviewTimeLabel>
            ))}
          </LabelContainer>
          <ChartList>
            {Object.keys(reviewsByHour).map((keyName) => (
              <ReviewsBar
                id={keyName}
                key={keyName}
                gridcolspan={reviewsByHour[keyName].length}
              />
            ))}
          </ChartList>
          <NumReviewsTxtContainer>
            {Object.keys(reviewsByHour).map((keyName, index) => (
              <NumberTxt key={index}>
                +{reviewsByHour[keyName].length}
              </NumberTxt>
            ))}
          </NumReviewsTxtContainer>
          <BasicGrid>
            {sumReviewsByHour.map((runningTotal, index) => (
              <NumberTxt key={index}>{runningTotal}</NumberTxt>
            ))}
          </BasicGrid>
          <TotalForDay>+{totalForDay}</TotalForDay>
        </ChartContainer>
      )}
    </>
  );
}

export default DailyReviewForecast;
