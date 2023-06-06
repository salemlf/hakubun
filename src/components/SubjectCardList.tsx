import { IonCol, IonRow } from "@ionic/react";

import {
  findAssignmentWithSubjID,
  isAssignmentLocked,
} from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";
import { SubjectCard } from "./cards/SubjectCard";

import styled from "styled-components/macro";

const SubjCol = styled(IonCol)`
  margin-bottom: 10px;
  flex-grow: 0;
`;

const SubjRow = styled(IonRow)`
  align-items: center;
  justify-content: flex-start;
  margin-left: -3px;
`;

type Props = {
  subjList: Subject[];
  assignmentList: Assignment[];
};

export const SubjectCardList = ({ subjList, assignmentList }: Props) => {
  return (
    <SubjRow>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            {assignmentList && (
              <>
                <SubjectCard
                  subject={subject}
                  assignment={findAssignmentWithSubjID(assignmentList, subject)}
                  locked={isAssignmentLocked(assignmentList, subject)}
                  isButtonLink={true}
                  useLockedStyle={false}
                ></SubjectCard>
              </>
            )}
          </SubjCol>
        );
      })}
    </SubjRow>
  );
};
