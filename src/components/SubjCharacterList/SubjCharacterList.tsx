import { SubjRow, SubjCol } from "../../styles/BaseStyledComponents";
import { Subject, SubjectType } from "../../types/Subject";
import { nanoid } from "nanoid";

import { getSubjectColor } from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import SubjectChars from "../SubjectChars/SubjectChars";
import styled from "styled-components";

const CharRow = styled(SubjRow)`
  flex-wrap: wrap;
  gap: 8px;
`;

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
function SubjCharacterList({ subjList, justify = "center" }: Props) {
  return (
    <CharRow justify={justify}>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`subj-name-${nanoid()}`}>
            <CharContainer subjType={subject.object}>
              <SubjectChars
                subject={subject}
                fontSize="1.75rem"
                withBgColor={true}
              />
            </CharContainer>
          </SubjCol>
        );
      })}
    </CharRow>
  );
}

export default SubjCharacterList;
