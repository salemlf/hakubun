import { useEffect, useState } from "react";
import { IonCol } from "@ionic/react";
import styled from "styled-components";
import { useAssignmentsAvailForReview } from "../../hooks/useAssignmentsAvailForReview";
import DailyReviewForecast from "./DailyReviewForecast";
import SwipeableTabs from "../SwipeableTabs";

const Container = styled.section`
  width: 100%;
  border-radius: 0.5rem;
  margin: auto;
  padding: 10px;
`;

const Heading = styled.h2`
  font-size: 1.5rem;
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

  // TODO: change to use useForecastTotalsStoreBase
  const [totalAvailablePrior, setTotalAvailablePrior] = useState<number[]>([]);
  console.log(
    "🚀 ~ file: ReviewForecast.tsx:72 ~ ReviewForecast ~ totalAvailablePrior:",
    totalAvailablePrior
  );

  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useAssignmentsAvailForReview();

  // TODO: change to use useForecastTotalsStoreBase
  const updateTotalAvailableReviews = (
    totalAvailableForDay: number,
    indexToUpdate: number
  ) => {
    // *testing
    console.log(
      "🚀 ~ file: ReviewForecast.tsx:85 ~ ReviewForecast ~ indexToUpdate:",
      indexToUpdate
    );
    console.log(
      "🚀 ~ file: ReviewForecast.tsx:101 ~ ReviewForecast ~ totalAvailableForDay:",
      totalAvailableForDay
    );
    // *testing

    let updatedTotalAvailablePrior = totalAvailablePrior;
    updatedTotalAvailablePrior[indexToUpdate + 1] =
      updatedTotalAvailablePrior[indexToUpdate] + totalAvailableForDay;
    setTotalAvailablePrior(updatedTotalAvailablePrior);
  };

  useEffect(() => {
    if (!availForReviewLoading && availForReviewData) {
      setTotalAvailablePrior([availForReviewData.length]);
      let forecastTimes = createStartAndEndDatesForWeek(new Date());
      setStartAndEndTimes(forecastTimes);

      setIsLoading(false);
    } else {
      setIsLoading(true);
      // setTotalAvailablePrior([]);
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
            roundedContainer={false}
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
                    // numAssignmentsAlreadyAvailable={
                    //   numAssignmentsAlreadyAvailable
                    // }
                    index={index}
                    updateTotalAvailableReviews={updateTotalAvailableReviews}
                    numAssignmentsAlreadyAvailable={totalAvailablePrior[index]}
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
