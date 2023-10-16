import { useEffect, useState } from "react";
import { SrsLevelName } from "../../types/MiscTypes";
import { getSrsLevelColor } from "../../services/SubjectAndAssignmentService";
import { countAssignmentTypesInSrsStage } from "./SrsStages.service";
import { useAssignmentsByStage } from "../../hooks/useAssignmentsByStage";
import SrsStagesLoadingSkeleton from "./SrsStagesLoadingSkeleton";
import styled from "styled-components";

const SrsButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 5px;
  width: 100%;
  gap: 5px;
`;

type ButtonProps = {
  srsStage: SrsLevelName;
};

const SrsStageButton = styled.button<ButtonProps>`
  width: 100%;
  margin: 0;
  padding: 10px 0;
  color: white;
  border-radius: 6px;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};
  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

const BurnedButton = styled(SrsStageButton)`
  grid-column: 1 / 3;
`;

const NumItemsInStage = styled.p`
  margin: 5px 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const StageName = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  text-transform: uppercase;
`;

// TODO: create active state of SrsStageButton where displays srs stage count by subject type
// TODO: count up radicals, kanji, and vocab in each stage
function SrsStages() {
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
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

  let stagesLoading =
    apprenticeStageDataLoading ||
    guruStageDataLoading ||
    masterStageDataLoading ||
    enlightenedStageDataLoading ||
    burnedStageDataLoading;

  useEffect(() => {
    if (!stagesLoading) {
      let apprenticeCount = countAssignmentTypesInSrsStage(apprenticeStageData);
      let guruCount = countAssignmentTypesInSrsStage(guruStageData);
      let masterCount = countAssignmentTypesInSrsStage(masterStageData);
      let enlightenedCount =
        countAssignmentTypesInSrsStage(enlightenedStageData);
      let burnedCount = countAssignmentTypesInSrsStage(burnedStageData);
    }
  }, [stagesLoading]);

  if (stagesLoading) {
    <SrsButtonContainer>
      <SrsStagesLoadingSkeleton></SrsStagesLoadingSkeleton>
    </SrsButtonContainer>;
  }

  return (
    <SrsButtonContainer>
      <SrsStageButton srsStage="apprentice" aria-label="Apprentice SRS Stage">
        <div>
          {apprenticeStageData && (
            <NumItemsInStage>{apprenticeStageData.length}</NumItemsInStage>
          )}
          <StageName>Apprentice</StageName>
        </div>
      </SrsStageButton>
      <SrsStageButton srsStage="guru" aria-label="Guru SRS Stage">
        <div>
          {guruStageData && (
            <NumItemsInStage>{guruStageData.length}</NumItemsInStage>
          )}
          <StageName>Guru</StageName>
        </div>
      </SrsStageButton>
      <SrsStageButton srsStage="master" aria-label="Master SRS Stage">
        <div>
          {masterStageData && (
            <NumItemsInStage>{masterStageData.length}</NumItemsInStage>
          )}
          <StageName>Master</StageName>
        </div>
      </SrsStageButton>
      <SrsStageButton srsStage="enlightened" aria-label="Enlightened SRS Stage">
        <div>
          {enlightenedStageData && (
            <NumItemsInStage>{enlightenedStageData.length}</NumItemsInStage>
          )}
          <StageName>Enlightened</StageName>
        </div>
      </SrsStageButton>
      <BurnedButton srsStage="burned" aria-label="Burned SRS Stage">
        <div>
          {burnedStageData && (
            <NumItemsInStage>{burnedStageData.length}</NumItemsInStage>
          )}
          <StageName>Burned</StageName>
        </div>
      </BurnedButton>
    </SrsButtonContainer>
  );
}

export default SrsStages;
