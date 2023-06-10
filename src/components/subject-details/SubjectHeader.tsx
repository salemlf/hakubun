import { IonHeader } from "@ionic/react";

import { LvlBadge } from "../LvlBadge";

import { Subject } from "../../types/Subject";
import { SubjNameAndCharacter } from "../SubjNameAndCharacter";
import styled from "styled-components/macro";

import { Row } from "./SubjectDetailsStyled";

// TODO: decrease size of level and subject cards on scrolldown
const Container = styled(IonHeader)`
  display: flex;
  align-items: center;
  background: var(--dark-greyish-purple);

  &::after {
    background: none;
  }

  height: 5rem;
  transition: height 2s;
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

// TODO: change from using badge for level to just using div
export const SubjectHeader = ({ subject }: Props) => {
  return (
    <Container>
      <StyledRow className="ion-padding">
        {subject && <LvlBadge level={subject!.level}></LvlBadge>}
        <SubjNameAndCharacter subject={subject} />
      </StyledRow>
    </Container>
  );
};
