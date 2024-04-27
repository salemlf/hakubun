import { useState } from "react";
import { useAssignmentsByStage } from "../../hooks/assignments/useAssignmentsByStage";
import { SrsLevelName } from "../../types/MiscTypes";
import SrsStagesLoadingSkeleton from "./SrsStagesLoadingSkeleton";
import ErrorMessage from "../ErrorMessage";
import SrsButton, { SrsStageButton } from "./SrsButton";
import styled from "styled-components";

const SrsButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 5px 0;
  width: 100%;
  gap: 5px;
`;

function SrsStages() {
  const [showStageDetails, setShowStageDetails] = useState<boolean>(false);

  const {
    isLoading: apprenticeStageDataLoading,
    data: apprenticeStageData,
    error: apprenticeStageErr,
  } = useAssignmentsByStage("apprentice");

  const {
    isLoading: guruStageDataLoading,
    data: guruStageData,
    error: guruStageDataErr,
  } = useAssignmentsByStage("guru");

  const {
    isLoading: masterStageDataLoading,
    data: masterStageData,
    error: masterStageErr,
  } = useAssignmentsByStage("master");

  const {
    isLoading: enlightenedStageDataLoading,
    data: enlightenedStageData,
    error: enlightenedStageErr,
  } = useAssignmentsByStage("enlightened");

  const {
    isLoading: burnedStageDataLoading,
    data: burnedStageData,
    error: burnedStageErr,
  } = useAssignmentsByStage("burned");

  const stagesLoading =
    apprenticeStageDataLoading ||
    guruStageDataLoading ||
    masterStageDataLoading ||
    enlightenedStageDataLoading ||
    burnedStageDataLoading;

  if (stagesLoading) {
    return (
      <SrsButtonContainer>
        <SrsStagesLoadingSkeleton></SrsStagesLoadingSkeleton>
      </SrsButtonContainer>
    );
  }

  const hasAllData =
    apprenticeStageData &&
    guruStageData &&
    masterStageData &&
    enlightenedStageData &&
    burnedStageData;

  const errOccurred =
    apprenticeStageErr ||
    guruStageDataErr ||
    masterStageErr ||
    enlightenedStageErr ||
    burnedStageErr;

  const stageNames: SrsLevelName[] = [
    "apprentice",
    "guru",
    "master",
    "enlightened",
    "burned",
  ];
  const labelSuffix = "SRS stage";

  if (errOccurred && !hasAllData) {
    return (
      <SrsButtonContainer data-testid="srs-stages-err">
        {stageNames.map((stageName) => (
          <SrsStageButton
            key={stageName}
            srsStage={stageName}
            aria-label={`${stageName} ${labelSuffix}`}
            fullWidth={stageName === "burned"}
            style={{
              alignItems: "center",
              padding: "5px",
            }}
          >
            <StageName>{stageName}</StageName>
            <ErrorMessage />
          </SrsStageButton>
        ))}
      </SrsButtonContainer>
    );
  }

  return (
    <SrsButtonContainer>
      <SrsButton
        stageName="apprentice"
        stageData={apprenticeStageData ?? []}
        ariaLabel="Apprentice SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SrsButton
        stageName="guru"
        stageData={guruStageData ?? []}
        ariaLabel="Guru SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SrsButton
        stageName="master"
        stageData={masterStageData ?? []}
        ariaLabel="Master SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SrsButton
        stageName="enlightened"
        stageData={enlightenedStageData ?? []}
        ariaLabel="Enlightened SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
      />
      <SrsButton
        stageName="burned"
        stageData={burnedStageData ?? []}
        ariaLabel="Burned SRS Stage"
        showStageDetails={showStageDetails}
        setShowDetails={setShowStageDetails}
        fullWidth={true}
      />
    </SrsButtonContainer>
  );
}

const StageName = styled.p`
  margin: 8px 0 3px 0;
  flex-basis: 100%;
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
`;

export default SrsStages;
