import styles from "./AssignmentSrs.module.scss";

import {
  getTimeFromNow,
  getSrsNameBySrsLvl,
  convertToUpperCase,
} from "../services/MiscService";
import { Assignment } from "../types/Assignment";

type Props = {
  assignment: Assignment | undefined;
};

export const AssignmentSrs = ({ assignment }: Props) => {
  const getTimeTill = () => {
    let availTime = assignment!.available_at;
    return getTimeFromNow(availTime);
  };

  const getSrsLvl = () => {
    if (assignment) {
      return getSrsNameBySrsLvl(assignment.srs_stage);
    }
    // TODO: display locked icon instead
    return "locked";
  };

  return (
    <div className={`${styles.srsContainer}`}>
      {assignment && <p className={`${styles.timeTill}`}>{getTimeTill()}</p>}
      <p className={`${styles.srsLevel} ${styles[getSrsLvl()]}`}>
        {convertToUpperCase(getSrsLvl())}
      </p>
    </div>
  );
};
