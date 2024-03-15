import {
  findAssignmentWithSubjID,
  isAssignmentLocked,
} from "../../services/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { Subject } from "../../types/Subject";
import { ButtonSize } from "../../types/MiscTypes";
import SubjectButton from "../SubjectButton/SubjectButton";
import VocabButton from "../VocabButton";
import { SubjRow, SubjCol } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

type ListProps = {
  subjList: Subject[];
  assignmentList: Assignment[];
  btnSize: ButtonSize;
  showDetails: boolean;
};

const ListWithVocab = ({
  subjList,
  assignmentList,
  btnSize,
  showDetails,
}: ListProps) => {
  return (
    <>
      {(subjList as Subject[]).map((subject: Subject) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            {subject.object === "vocabulary" ||
            subject.object === "kana_vocabulary" ? (
              <VocabButton
                subject={subject}
                btnSize={btnSize}
                showDetails={showDetails}
              />
            ) : (
              <SubjectButton
                btnSize={btnSize}
                subject={subject}
                assignment={findAssignmentWithSubjID(assignmentList, subject)}
                locked={isAssignmentLocked(assignmentList, subject)}
                isButtonLink={true}
                useLockedStyle={false}
                showDetails={showDetails}
              ></SubjectButton>
            )}
          </SubjCol>
        );
      })}
    </>
  );
};

const ListWithoutVocab = ({
  subjList,
  assignmentList,
  btnSize,
  showDetails,
}: ListProps) => {
  return (
    <>
      {(subjList as Subject[]).map((subject: Subject) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            <SubjectButton
              btnSize={btnSize}
              subject={subject}
              assignment={findAssignmentWithSubjID(assignmentList, subject)}
              locked={isAssignmentLocked(assignmentList, subject)}
              isButtonLink={true}
              useLockedStyle={false}
              showDetails={showDetails}
            ></SubjectButton>
          </SubjCol>
        );
      })}
    </>
  );
};

const ButtonRow = styled(SubjRow)`
  /* margin-top: 10px; */
  gap: 10px;
  flex-wrap: wrap;
`;

type Props = {
  subjList: Subject[];
  assignmentList: Assignment[];
  btnSize: ButtonSize;
  justify?: string;
  allowVocab?: boolean;
  showDetails?: boolean;
};

function SubjectButtonList({
  subjList,
  assignmentList,
  btnSize,
  justify = "center",
  allowVocab = false,
  showDetails = true,
}: Props) {
  return (
    <ButtonRow justify={justify}>
      {allowVocab ? (
        <ListWithVocab
          subjList={subjList}
          assignmentList={assignmentList}
          btnSize={btnSize}
          showDetails={showDetails}
        />
      ) : (
        <ListWithoutVocab
          subjList={subjList}
          assignmentList={assignmentList}
          btnSize={btnSize}
          showDetails={showDetails}
        />
      )}
    </ButtonRow>
  );
}

export default SubjectButtonList;
