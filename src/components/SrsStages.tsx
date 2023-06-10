import { IonCol, IonRow, IonButton, IonGrid } from "@ionic/react";

import { useAssignmentsByStage } from "../hooks/useAssignmentsByStage";

import { SrsStagesLoadingSkeleton } from "./loading-skeletons/SrsStagesLoadingSkeleton";

import styles from "./SrsStages.module.scss";

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
    <IonGrid>
      <IonRow>
        <SrsStagesLoadingSkeleton></SrsStagesLoadingSkeleton>
      </IonRow>
    </IonGrid>;
  }

  return (
    <IonGrid className={`${styles.btnContainer}`}>
      <IonRow className={`${styles.rowContainer}`}>
        <IonCol size-xs="6" size-md="3">
          <IonButton className={`${styles.btn} ${styles.apprentice}`}>
            <div>
              {apprenticeStageData && (
                <p className={`${styles.stageNum}`}>
                  {apprenticeStageData.length}
                </p>
              )}
              <p className={`${styles.stageTxt}`}>Apprentice</p>
            </div>
          </IonButton>
        </IonCol>
        <IonCol size-xs="6" size-md="3">
          <IonButton className={`${styles.btn} ${styles.guru}`}>
            <div>
              {guruStageData && (
                <p className={`${styles.stageNum}`}>{guruStageData.length}</p>
              )}
              <p className={`${styles.stageTxt}`}>Guru</p>
            </div>
          </IonButton>
        </IonCol>
        <IonCol size-xs="6" size-md="3">
          <IonButton className={`${styles.btn} ${styles.master}`}>
            <div>
              {masterStageData && (
                <p className={`${styles.stageNum}`}>{masterStageData.length}</p>
              )}
              <p className={`${styles.stageTxt}`}>Master</p>
            </div>
          </IonButton>
        </IonCol>
        <IonCol size-xs="6" size-md="3">
          <IonButton className={`${styles.btn} ${styles.enlightened}`}>
            <div>
              {enlightenedStageData && (
                <p className={`${styles.stageNum}`}>
                  {enlightenedStageData.length}
                </p>
              )}
              <p className={`${styles.stageTxt}`}>Enlightened</p>
            </div>
          </IonButton>
        </IonCol>
        <IonCol size-xs="12" size-md="6">
          <IonButton className={`${styles.btn} ${styles.burned}`}>
            <div>
              {burnedStageData && (
                <p className={`${styles.stageNum}`}>{burnedStageData.length}</p>
              )}
              <p className={`${styles.stageTxt}`}>Burned</p>
            </div>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};
