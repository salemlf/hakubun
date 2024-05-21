// TODO: change so not relying on IonIcon
import { IonIcon } from "@ionic/react";
import {
  getTimeFromNow,
  getSrsNameBySrsLvl,
} from "../../services/MiscService/MiscService";
import { getSrsLevelColor } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { Assignment } from "../../types/Assignment";
import { SrsLevelName } from "../../types/MiscTypes";
import AlarmClockIcon from "../../images/alarm-clock.svg";
import StairsIcon from "../../images/stairs.svg";
import styled from "styled-components";

type SrsLvlProps = {
  srsStage: SrsLevelName;
};

const SrsLvlContainer = styled.div<SrsLvlProps>`
  display: flex;
  justify-content: center;
  gap: 3px;
  align-items: center;
  padding: 5px;
  border-radius: 12px;
  background: ${({ srsStage }) => getSrsLevelColor(srsStage)};
`;

const SrsTxt = styled.p`
  margin: 5px 0;
  text-align: center;
`;

const SrsLvlTxt = styled(SrsTxt)`
  color: white;
  text-transform: capitalize;
`;

const TimeTillContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3px;
  align-items: center;
  padding: 5px;
  border-radius: 12px;
  background: var(--ion-color-tertiary);
`;

const SrsIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

const TimeTillTxt = styled(SrsTxt)`
  color: black;
`;

type Props = {
  assignment: Assignment | undefined;
};

function AssignmentSrs({ assignment }: Props) {
  // TODO: display locked icon
  const srsLevelName = assignment
    ? getSrsNameBySrsLvl(assignment.srs_stage)
    : "locked";

  const timeTillReview = assignment
    ? getTimeFromNow(assignment.available_at)
    : "N/A";

  return (
    <>
      <TimeTillContainer>
        <SrsIcon src={AlarmClockIcon} />
        <TimeTillTxt>{timeTillReview}</TimeTillTxt>
      </TimeTillContainer>
      <SrsLvlContainer srsStage={srsLevelName as SrsLevelName}>
        <SrsIcon src={StairsIcon} />
        <SrsLvlTxt>{srsLevelName}</SrsLvlTxt>
      </SrsLvlContainer>
    </>
  );
}

export default AssignmentSrs;
