import { useEffect, useState } from "react";
import useForecastTotalsStoreFacade from "../../stores/useForecastTotalsStore/useForecastTotalsStore.facade";
import useUserInfoStoreFacade from "../../stores/useUserInfoStore/useUserInfoStore.facade";
import { useReviews } from "../../hooks/useReviews";
import DailyReviewForecast from "./DailyReviewForecast";
import SwipeableTabs from "../SwipeableTabs";
import LoadingDots from "../LoadingDots";
import Card from "../Card";
import { LoadingContainer } from "../../styles/BaseStyledComponents";

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
      const currDay = new Date();
      currDay.setDate(el.getDate() + index);

      const startTime = new Date(currDay);
      if (index !== 0) {
        startTime.setHours(0, 0, 0, 0);
      }

      const endTime = new Date(currDay);
      endTime.setHours(23, 59, 59, 999);

      const dayOfWeek = dayOfWeekNames[startTime.getDay()];

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

  const { userInfo } = useUserInfoStoreFacade();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (userInfo && userInfo.level) {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    }
  }, [userInfo]);

  const {
    seedRunningTotalAvailableReviews,
    runningTotalAvailableReviews: runningTotals,
  } = useForecastTotalsStoreFacade();

  const {
    isLoading: availForReviewLoading,
    data: availForReviewData,
    error: availForReviewErr,
  } = useReviews(isEnabled);

  // TODO: this might have issues not conforming to invalidation times of availForReviewData, hmm
  useEffect(() => {
    if (!availForReviewLoading && availForReviewData) {
      // using previously fetched data if already loaded
      if (runningTotals.length === 0) {
        seedRunningTotalAvailableReviews(availForReviewData.length);
      }

      const forecastTimes = createStartAndEndDatesForWeek(new Date());
      setStartAndEndTimes(forecastTimes);

      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [availForReviewLoading]);

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <LoadingDots size="md" />
        </LoadingContainer>
      ) : (
        <Card
          margin="12px 0"
          headerBgColor="var(--ion-color-primary)"
          title="Review Forecast"
          headerTextColor="black"
        >
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
        </Card>
      )}
    </>
  );
}

export default ReviewForecast;
