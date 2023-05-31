import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { TxtWithSubjTags } from "../TxtWithSubjTags";

import styles from "./RadicalSubjDetails.module.scss";
import { Subject } from "../../types/Subject";

type Props = {
  subject: Subject;
};

export const RadicalSubjDetails = ({ subject }: Props) => {
  return (
    <IonRow class="ion-justify-content-start">
      <div className="ion-padding">
        <h3>Name Mnemonic</h3>
        <TxtWithSubjTags mnemonic={subject.meaning_mnemonic} />
        <h3>Found in Kanji</h3>
        {/* TODO: create api call in api file and map over amalgamation_subject_ids (kanji) here, using subjectcards with isButtonLink as true  */}
      </div>
    </IonRow>
  );
};
