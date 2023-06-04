import { IonSkeletonText } from "@ionic/react";

import { SubjectCard } from "./cards/SubjectCard";

import { getSubjectDisplayName } from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";

import styles from "./SubjNameAndCharacter.module.scss";
import styled from "styled-components";

const SubjectName = styled.h1`
  margin: 0;
`;

type Props = {
  subject: Subject;
  assignment: Assignment | undefined;
};

export const SubjNameAndCharacter = ({ subject, assignment }: Props) => {
  // TODO: display loading skeletons
  return (
    <>
      <SubjectCard
        subject={subject}
        assignment={assignment}
        clickDisabled={true}
        locked={assignment?.subject_id !== subject.id}
        useLockedStyle={false}
      ></SubjectCard>
      {subject && <SubjectName>{getSubjectDisplayName(subject)}</SubjectName>}
    </>
  );
};
