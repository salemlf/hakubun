import { IonRow } from "@ionic/react";
// import { SubjAndAssignment } from "../types/MiscTypes";

import {
  getTimeFromNow,
  getSrsLevelsByName,
  convertToUpperCase,
} from "../services/MiscService";
import { Assignment } from "../types/Assignment";

type Props = {
  assignment: Assignment;
};

export const AssignmentSrs = ({ assignment }: Props) => {
  console.log(
    "🚀 ~ file: AssignmentSrs.tsx:16 ~ AssignmentSrs ~ assignment:",
    assignment
  );

  let timeTill = getTimeFromNow(assignment.available_at);

  return (
    <IonRow>
      <p>{timeTill}</p>
    </IonRow>
  );
};
