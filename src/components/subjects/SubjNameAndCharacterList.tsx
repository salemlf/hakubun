import { SubjNameAndCharacter } from "../SubjNameAndCharacter";
import { SubjRow, SubjCol } from "../styles/BaseStyledComponents";
import { Subject, SubjectType } from "../../types/Subject";
import { Assignment } from "../../types/Assignment";
import { nanoid } from "nanoid";

import styled from "styled-components/macro";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";

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
  assignmentList: Assignment[];
  justify?: string;
};

export const SubjNameAndCharacterList = ({
  subjList,
  assignmentList,
  justify = "center",
}: Props) => {
  return (
    <SubjRow justify={justify}>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`subj-name-${nanoid()}`}>
            {assignmentList && (
              <CharContainer subjType={subject.object}>
                <SubjNameAndCharacter subject={subject} />
              </CharContainer>
            )}
          </SubjCol>
        );
      })}
    </SubjRow>
  );
};
