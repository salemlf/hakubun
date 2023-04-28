import {
  IonRow,
  IonCard,
  IonCol,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";

import { Subject } from "../types/Subject";
import styles from "./KanjiContainer.module.css";

interface Props {
  kanji?: Subject[];
}

export const KanjiContainer = ({ kanji }: Props) => {
  return (
    <IonCard className={`${styles.kanjiCard}`}>
      <IonCardHeader>
        <IonCardTitle className={`${styles.kanjiCardTitle}`}>
          Kanji
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent className={`${styles.cardContent}`}>
        <IonRow class="ion-align-items-center ion-justify-content-start">
          {(kanji as Subject[]).map((kanjiItem: any) => {
            return (
              <IonCol key={`col_${kanjiItem.id}`} size="2">
                <div key={`${kanjiItem.id}`} className={`${styles.kanjiDiv}`}>
                  <p className={`${styles.kanjiText}`}>
                    {kanjiItem.characters}
                  </p>
                </div>
              </IonCol>
            );
          })}
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
};
