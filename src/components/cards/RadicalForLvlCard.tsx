import { useEffect, useState } from "react";
import { IonRow, IonCol, IonSkeletonText } from "@ionic/react";

import { Subject } from "../../types/Subject";

import { BasicCard } from ".././cards/BasicCard";
import { RadicalImageCard } from "../buttons/RadicalImageButton";
import { SubjectCard } from "../cards/SubjectCard";

import { useRadicalSubAndAssignments } from "../../hooks/useRadicalSubAndAssignments";

import styles from "./RadicalForLvlCard.module.scss";

interface Props {
  level: number | undefined;
}

export const RadicalContainer = ({ level }: Props) => {
  const [loading, setLoading] = useState(true);
  const { radicalDataLoading, radicalData } =
    useRadicalSubAndAssignments(level);

  useEffect(() => {
    // TODO: change so if statement not needed?
    if (radicalData) {
      setLoading(false);
    }
  }, [radicalDataLoading]);

  return (
    <>
      {!loading ? (
        <BasicCard title="Radicals" isLoading={false}>
          <IonRow class="ion-align-items-center ion-justify-content-start">
            {(radicalData as Subject[]).map((radical: any) => {
              return (
                <IonCol
                  key={`col_${radical.id}`}
                  size="2"
                  className={`${styles.radItemContainer}`}
                >
                  {radical.useImage ? (
                    <RadicalImageCard
                      radicalObj={radical}
                      availableImages={radical.availableImages}
                      srsStage={radical.srs_stage}
                      availTime={radical.available_at}
                    ></RadicalImageCard>
                  ) : (
                    <SubjectCard
                      subject={radical}
                      srsStage={radical.srs_stage}
                      availTime={radical.available_at}
                      isRadical={true}
                    ></SubjectCard>
                  )}
                </IonCol>
              );
            })}
          </IonRow>
        </BasicCard>
      ) : (
        <BasicCard title="" isLoading={true}>
          <IonRow>
            <IonSkeletonText
              animated={true}
              style={{ height: "50px" }}
            ></IonSkeletonText>
          </IonRow>
          <IonRow>
            <IonSkeletonText
              animated={true}
              style={{ height: "50px" }}
            ></IonSkeletonText>
          </IonRow>
        </BasicCard>
      )}
    </>
  );
};
