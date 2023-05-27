import { getAlternativeMeanings } from "../services/SubjectAndAssignmentService";

import styles from "./AlternativeMeanings.module.scss";
import { Subject } from "../types/Subject";

type Props = {
  subject: Subject;
};

//   TODO: add a button to add alternative meanings/synonyms
export const AlternativeMeanings = ({ subject }: Props) => {
  let altMeanings = getAlternativeMeanings(subject);

  return (
    <div className={`${styles.altMeaningsContainer}`}>
      <h3>Alternative Meanings</h3>
      <p>
        {altMeanings && altMeanings.length
          ? altMeanings
              .map((altMeaning: any) => {
                return altMeaning.meaning;
              })
              .join(", ")
          : "-"}
      </p>
    </div>
  );
};
