import { SubjRow, SubjCol } from "../styles/BaseStyledComponents";
import { Subject, SubjectType } from "../../types/Subject";
import { nanoid } from "nanoid";

import styled from "styled-components/macro";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { SubjectChars } from "../SubjectChars";

type CharContainerProps = {
  subjType: SubjectType;
};

const CharContainer = styled.div<CharContainerProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  border-radius: 10px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  subjList: Subject[];
  justify?: string;
};

// TODO: turn into buttons that link to subject
export const SubjCharacterList = ({ subjList, justify = "center" }: Props) => {
  return (
    <SubjRow justify={justify}>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`subj-name-${nanoid()}`}>
            <CharContainer subjType={subject.object}>
              <SubjectChars
                subject={subject}
                fontSize="2rem"
                withBgColor={true}
              />
            </CharContainer>
          </SubjCol>
        );
      })}
    </SubjRow>
  );
};
