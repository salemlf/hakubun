import { IonRow } from "@ionic/react";

import { SubjAndAssignment } from "../types/MiscTypes";

import { getAlternativeMeanings } from "../services/SubjectAndAssignmentService";

import styles from "./AlternativeMeanings.module.scss";

type Props = {
  subject: SubjAndAssignment;
};
// TODO: display "-" if no alternative meanings

//   TODO: add a button to add alternative meanings/synonyms
export const AlternativeMeanings = ({ subject }: Props) => {
  return (
    <IonRow className={`${styles.altMeaningsTxt}`}>
      <h2>Alternative Meanings</h2>
      <p>
        {(getAlternativeMeanings(subject) as [])
          .map((altMeaning: any) => {
            return altMeaning.meaning;
          })
          .join(", ")}
      </p>
      <IonRow />
    </IonRow>
  );
};
