import {
  findAssignmentWithSubjID,
  isAssignmentLocked,
} from "../../services/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { Subject } from "../../types/Subject";
import SubjectButton from "../SubjectButton/SubjectButton";
import { SubjRow, SubjCol } from "../../styles/BaseStyledComponents";
import { ButtonSize } from "../../types/MiscTypes";

type Props = {
  subjList: Subject[];
  assignmentList: Assignment[];
  btnSize: ButtonSize;
  justify?: string;
};

function SubjectButtonList({
  subjList,
  assignmentList,
  btnSize,
  justify = "center",
}: Props) {
  return (
    <SubjRow justify={justify}>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            {assignmentList && (
              <SubjectButton
                btnSize={btnSize}
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
}

export default SubjectButtonList;
