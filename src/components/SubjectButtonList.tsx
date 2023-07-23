import {
  findAssignmentWithSubjID,
  isAssignmentLocked,
} from "../services/SubjectAndAssignmentService";

import { Subject } from "../types/Subject";
import { Assignment } from "../types/Assignment";
import SubjectButton from "./SubjectButton/SubjectButton";
import { SubjRow, SubjCol } from "./styles/BaseStyledComponents";

type Props = {
  subjList: Subject[];
  assignmentList: Assignment[];
  justify?: string;
};

export const SubjectButtonList = ({
  subjList,
  assignmentList,
  justify = "center",
}: Props) => {
  return (
    <SubjRow justify={justify}>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            {assignmentList && (
              <SubjectButton
                subject={subject}
                assignment={findAssignmentWithSubjID(assignmentList, subject)}
                locked={isAssignmentLocked(assignmentList, subject)}
                isButtonLink={true}
                useLockedStyle={false}
              ></SubjectButton>
            )}
          </SubjCol>
        );
      })}
    </SubjRow>
  );
};
