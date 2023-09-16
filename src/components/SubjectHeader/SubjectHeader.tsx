import { IonHeader } from "@ionic/react";
import { Subject } from "../../types/Subject";
import LvlBadge from "../LvlBadge/LvlBadge";
import SubjNameAndCharacter from "./SubjNameAndCharacter";
import { Row } from "../../styles/SubjectDetailsStyled";
import styled from "styled-components";

// TODO: make subject name and char larger, then decrease size of level and subject cards on scrolldown
const Container = styled(IonHeader)`
  display: flex;
  align-items: center;
  background: var(--dark-greyish-purple);

  &::after {
    background: none;
  }

  padding: 10px 0;
  transition: height 2s;
  box-shadow: none;
`;

const StyledRow = styled(Row)`
  display: flex;
  gap: 10px;
  align-items: center;

  ion-item::part(native) {
    padding: 0;
  }

  ion-col {
    flex-grow: 0;
  }

  ion-badge {
    height: 3rem;
    width: 3rem;
    line-height: 1.3;
    font-size: 2rem;
    border-radius: 12px;
  }

  padding-top: var(--ion-padding, 5px);
  padding-bottom: var(--ion-padding, 5px);
`;

type Props = {
  subject: Subject;
};

function SubjectHeader({ subject }: Props) {
  return (
    <Container>
      <StyledRow className="ion-padding">
        {subject && <LvlBadge level={subject!.level}></LvlBadge>}
        <SubjNameAndCharacter subject={subject} />
      </StyledRow>
    </Container>
  );
}

export default SubjectHeader;
