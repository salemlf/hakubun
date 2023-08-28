import { useEffect, useState } from "react";
import { IonCol } from "@ionic/react";
import { useAssignmentsAvailableInRange } from "../../hooks/useAssignmentsAvailableInRange";
import { Assignment } from "../../types/Assignment";
import styled from "styled-components";

const Container = styled.section`
  width: 100%;
  border-radius: 0.5rem;
  margin: auto;
  padding: 10px;
`;

const ChartContainer = styled.section`
  display: flex;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
`;

const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 0.5em 0;
  align-items: center;
  margin: 0;
  padding: 0;
  grid-auto-columns: 1fr;
  margin-right: 5px;
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

const NumReviewsBar = styled.li<NumReviewsBarProps>`
  background: var(--ion-color-tertiary);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  grid-column-start: 1;
  grid-column-end: ${({ gridcolspan }) => `span ${gridcolspan}`};
  border-radius: 0 12px 12px 0;
`;

// const NumReviews = styled.p`
//   margin: 0;
// `;

type ReviewsByHourData = {
  [key: string]: Assignment[];
};

function get12HourFormat(date: Date): string {
  const hours = date.getHours();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}${amOrPm}`;
}

function ReviewForecast() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsByHour, setReviewsByHour] = useState<ReviewsByHourData>({});

  let rightNow = new Date();
  let rightNowISO = rightNow.toISOString();
  let endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  let endOfTodayISO = endOfToday.toISOString();

  const {
    isLoading: assignmentLoading,
    data: assignments,
    error: assignmentsErr,
  } = useAssignmentsAvailableInRange(rightNowISO, endOfTodayISO);

  useEffect(() => {
    if (!assignmentLoading && assignments) {
      // *testing
      console.log("assignments", assignments);
      // *testing

      const sortedAssignments = assignments.sort(
        (a: Assignment, b: Assignment) => {
          if (a.available_at === null) {
            return 1;
          } else if (b.available_at === null) {
            return -1;
          } else {
            return (
              new Date(a.available_at).getTime() -
              new Date(b.available_at).getTime()
            );
          }
        }
      );

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

      setReviewsByHour(groupedByHour);
      // *testing
      console.log(
        "🚀 ~ file: ReviewForecast.tsx:80 ~ groupByCategory ~ groupedByHour:",
        groupedByHour
      );
      // *testing

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [assignmentLoading]);

  return (
    <IonCol>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <Heading>Review Forecast</Heading>
          <ChartContainer>
            <LabelContainer>
              {Object.keys(reviewsByHour).map((keyName) => (
                <ReviewTimeLabel htmlFor={keyName}>{keyName}</ReviewTimeLabel>
              ))}
            </LabelContainer>
            <ChartList>
              {Object.keys(reviewsByHour).map((keyName) => (
                <>
                  <NumReviewsBar
                    id={keyName}
                    key={keyName}
                    gridcolspan={reviewsByHour[keyName].length}
                  >
                    <span>+{reviewsByHour[keyName].length}</span>
                  </NumReviewsBar>
                </>
              ))}
            </ChartList>
          </ChartContainer>
        </Container>
      )}
    </IonCol>
  );
}

export default ReviewForecast;
