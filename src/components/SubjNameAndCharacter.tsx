import { IonCol, IonRow, IonSkeletonText } from "@ionic/react";

import { BasicCard } from "./cards/BasicCard";
import { SubjectCard } from "./cards/SubjectCard";
import { RadicalImageCard } from "./cards/RadicalImageCard";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import styles from "./SubjNameAndCharacter.module.scss";

type Props = {
  subject: Subject | undefined;
  assignment: Assignment | undefined;
};

export const SubjNameAndCharacter = ({ subject, assignment }: Props) => {
  // TODO: display loading skeletons
  return (
    <>
      {subject?.object == "radical" ? (
        subject.useImage ? (
          <RadicalImageCard
            subject={subject}
            assignment={assignment}
            clickDisabled={true}
            displayProgress={false}
          ></RadicalImageCard>
        ) : (
          <SubjectCard
            subject={subject}
            assignment={assignment}
            isRadical={true}
            clickDisabled={true}
            displayProgress={false}
            locked={assignment?.subject_id !== subject.id}
          ></SubjectCard>
        )
      ) : (
        <SubjectCard
          subject={subject}
          assignment={assignment}
          isRadical={false}
          clickDisabled={true}
          displayProgress={false}
          locked={assignment?.subject_id !== subject?.id}
        ></SubjectCard>
      )}
      {subject && <h1>{getSubjectDisplayName(subject)}</h1>}
    </>
  );
};
