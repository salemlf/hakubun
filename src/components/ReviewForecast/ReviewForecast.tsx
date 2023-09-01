import { useEffect, useState } from "react";
import { IonCol } from "@ionic/react";
import styled from "styled-components";
import { useAssignmentsAvailForReview } from "../../hooks/useAssignmentsAvailForReview";
import DailyReviewForecast from "./DailyReviewForecast";
import SwipeableTabs from "../SwipeableTabs";
import { useForecastTotalsStore } from "../../stores/useForecastTotalsStore";

const Container = styled.section`
  width: 100%;
  border-radius: 0.5rem;
  margin: auto;
  padding: 10px;
  background-color: var(--light-greyish-purple);
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-top: 5px;
`;

const dayOfWeekNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type StartAndEndTimeInfo = {
  dayOfWeek: string;
  startTimeIsoString: string;
  endTimeIsoString: string;
};

const createStartAndEndDatesForWeek = (date: Date): StartAndEndTimeInfo[] => {
  return Array(7)
    .fill(new Date(date))
    .map((el, index) => {
      let currDay = new Date();
      currDay.setDate(el.getDate() + index);

      let startTime = new Date(currDay);
      if (index !== 0) {
        startTime.setHours(0, 0, 0, 0);
      }

      let endTime = new Date(currDay);
      endTime.setHours(23, 59, 59, 999);

      let dayOfWeek = dayOfWeekNames[startTime.getDay()];

      return {
        dayOfWeek,
        startTimeIsoString: startTime.toISOString(),
        endTimeIsoString: endTime.toISOString(),
      };
    });
};

// TODO: fix issue where not reloading all data once coming back to page
function ReviewForecast() {
  const [selectedTabKey, setSelectedTabKey] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(true);
  const [startAndEndTimes, setStartAndEndTimes] = useState<
    StartAndEndTimeInfo[]
  >([]);

  // !added
  const seedRunningTotalAvailableReviews =
    useForecastTotalsStore.use.seedRunningTotalAvailableReviews();
  const runningTotals =
    useForecastTotalsStore.use.runningTotalAvailableReviews();
  // !added

  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  // TODO: this might have issues not conforming to invalidation times of availForReviewData, hmm
  useEffect(() => {
    if (!availForReviewLoading && availForReviewData) {
      // using previously fetched data if already loaded
      if (runningTotals.length === 0) {
        seedRunningTotalAvailableReviews(availForReviewData.length);
      }

      let forecastTimes = createStartAndEndDatesForWeek(new Date());
      setStartAndEndTimes(forecastTimes);

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [availForReviewLoading]);

  return (
    <IonCol>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Container>
          <Heading>Review Forecast</Heading>
          <SwipeableTabs
            tabBgColor="var(--ion-color-primary)"
            roundedContainer={true}
            selectedTabKey={selectedTabKey}
            setSelectedTabKey={setSelectedTabKey}
            tabs={startAndEndTimes.map((forecastForDayTimes, index) => {
              return {
                key: index.toString(),
                id: index.toString(),
                label: forecastForDayTimes.dayOfWeek,
                tabContents: (
                  <DailyReviewForecast
                    key={index}
                    index={index}
                    startDateIsoString={forecastForDayTimes.startTimeIsoString}
                    endDateIsoString={forecastForDayTimes.endTimeIsoString}
                  />
                ),
              };
            })}
            defaultValue={"0"}
          />
        </Container>
      )}
    </IonCol>
  );
}

export default ReviewForecast;
