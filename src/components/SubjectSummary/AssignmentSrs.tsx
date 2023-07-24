import { getTimeFromNow, getSrsNameBySrsLvl } from "../../services/MiscService";
import { getSrsLevelColor } from "../../services/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { SrsLevelName } from "../../types/MiscTypes";
import {
  SubjSummaryCol,
  SubjSummaryRow,
} from "../../styles/SubjectDetailsStyled";
import styled from "styled-components/macro";

const AssignmentSrsContainer = styled(SubjSummaryCol)`
  justify-content: flex-end;
  padding: 5px 0;
  flex: 0 0 40%;

  p {
    margin: 5px 0;
  }
`;

const StagesRow = styled(SubjSummaryRow)`
  justify-content: flex-end;
  gap: 10px;
`;

type LvlTxtProps = {
  srsStage: SrsLevelName;
};

const SrsLvlTxt = styled.p<LvlTxtProps>`
  color: white;
  padding: 5px;
  border-radius: 12px;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};
  text-transform: capitalize;
`;

const TimeTillTxt = styled.p`
  padding: 5px;
  border-radius: 12px;
  background: var(--ion-color-tertiary);
  color: var(--dark-greyish-purple);
`;

type Props = {
  assignment: Assignment | undefined;
};

function AssignmentSrs({ assignment }: Props) {
  // TODO: display locked icon
  let srsLevelName = assignment
    ? getSrsNameBySrsLvl(assignment.srs_stage)
    : "locked";

  let timeTillReview = assignment
    ? getTimeFromNow(assignment.available_at)
    : "N/A";

  return (
    <AssignmentSrsContainer>
      <StagesRow>
        <TimeTillTxt>{timeTillReview}</TimeTillTxt>
        <SrsLvlTxt srsStage={srsLevelName as SrsLevelName}>
          {srsLevelName}
        </SrsLvlTxt>
      </StagesRow>
    </AssignmentSrsContainer>
  );
}

export default AssignmentSrs;
