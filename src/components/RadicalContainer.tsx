import {
  IonRow,
  IonCard,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { Subject } from "../types/Subject";
import styles from "./RadicalContainer.module.css";

interface Props {
  radicals?: Subject[];
}

export const RadicalContainer = ({ radicals }: Props) => {
  return (
    <IonCard className={`${styles.radicalCard}`}>
      <IonCardHeader>
        <IonCardTitle className={`${styles.radicalCardTitle}`}>
          Radicals
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className={`${styles.cardContent}`}>
        <IonRow class="ion-align-items-center ion-justify-content-start">
          {(radicals as Subject[]).map((radical: any) => {
            return (
              <IonCol key={`col_${radical.id}`} size="2">
                <div key={`${radical.id}`} className={`${styles.radicalDiv}`}>
                  <img
                    src={
                      radical.selectedImage
                        ? radical.selectedImage
                        : radical.fallbackImage
                    }
                    alt="radical image"
                  />
                </div>
              </IonCol>
            );
          })}
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};
