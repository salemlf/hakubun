import { Subject } from "../../types/Subject";
import LvlBadge from "../LvlBadge/LvlBadge";
import SubjNameAndCharacter from "./SubjNameAndCharacter";
import { Header } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

// TODO: make subject name and char larger, then decrease size of level and subject cards on scrolldown
const Container = styled(Header)`
  display: flex;
  align-items: center;

  &::after {
    background: none;
  }

  padding: 10px 0 5px;
  transition: height 2s;
  box-shadow: none;
`;

const StyledRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-top: var(--ion-padding, 5px);
  padding-bottom: var(--ion-padding, 5px);
  margin-left: 10px;
  flex-wrap: wrap;
`;

type Props = {
  subject: Subject;
};

function SubjectHeader({ subject }: Props) {
  return (
    <Container bgcolor="var(--foreground-color)">
      <StyledRow>
        {subject && <LvlBadge level={subject!.level}></LvlBadge>}
        <SubjNameAndCharacter subject={subject} />
      </StyledRow>
    </Container>
  );
}

export default SubjectHeader;
