import { IonCol, IonRow, IonGrid } from "@ionic/react";
import { getSrsLevelColor } from "../services/SubjectAndAssignmentService";
import { useAssignmentsByStage } from "../hooks/useAssignmentsByStage";
import { SrsLevelName } from "../types/MiscTypes";
import { SrsStagesLoadingSkeleton } from "./loading-skeletons/SrsStagesLoadingSkeleton";
import styled from "styled-components/macro";

type ButtonProps = {
  srsStage: SrsLevelName;
};

const SrsButtonContainer = styled(IonGrid)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
`;

const ButtonRowContainer = styled(IonRow)`
  width: 100%;
`;

const SrsStageButton = styled.button<ButtonProps>`
  width: 100%;
  margin: 0;
  height: 3.5rem;
  color: white;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};
`;

const NumItemsInStage = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  font-weight: 700;
`;

const StageName = styled.p`
  margin: 5px 0;
  font-size: 0.75rem;
  text-transform: uppercase;
`;

export const SrsStages = () => {
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

  if (stagesLoading) {
    <SrsButtonContainer>
      <ButtonRowContainer>
        <SrsStagesLoadingSkeleton></SrsStagesLoadingSkeleton>
      </ButtonRowContainer>
    </SrsButtonContainer>;
  }

  return (
    <SrsButtonContainer>
      <ButtonRowContainer>
        <IonCol size-xs="6" size-md="3">
          <SrsStageButton srsStage="apprentice">
            <div>
              {apprenticeStageData && (
                <NumItemsInStage>{apprenticeStageData.length}</NumItemsInStage>
              )}
              <StageName>Apprentice</StageName>
            </div>
          </SrsStageButton>
        </IonCol>
        <IonCol size-xs="6" size-md="3">
          <SrsStageButton srsStage="guru">
            <div>
              {guruStageData && (
                <NumItemsInStage>{guruStageData.length}</NumItemsInStage>
              )}
              <StageName>Guru</StageName>
            </div>
          </SrsStageButton>
        </IonCol>
        <IonCol size-xs="6" size-md="3">
          <SrsStageButton srsStage="master">
            <div>
              {masterStageData && (
                <NumItemsInStage>{masterStageData.length}</NumItemsInStage>
              )}
              <StageName>Master</StageName>
            </div>
          </SrsStageButton>
        </IonCol>
        <IonCol size-xs="6" size-md="3">
          <SrsStageButton srsStage="enlightened">
            <div>
              {enlightenedStageData && (
                <NumItemsInStage>{enlightenedStageData.length}</NumItemsInStage>
              )}
              <StageName>Enlightened</StageName>
            </div>
          </SrsStageButton>
        </IonCol>
        <IonCol size-xs="12" size-md="6">
          <SrsStageButton srsStage="burned">
            <div>
              {burnedStageData && (
                <NumItemsInStage>{burnedStageData.length}</NumItemsInStage>
              )}
              <StageName>Burned</StageName>
            </div>
          </SrsStageButton>
        </IonCol>
      </ButtonRowContainer>
    </SrsButtonContainer>
  );
};
