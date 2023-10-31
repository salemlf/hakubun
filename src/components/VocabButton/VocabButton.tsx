import { useNavigate } from "react-router";
import {
  KanaVocabulary,
  Subject,
  SubjectType,
  Vocabulary,
} from "../../types/Subject";
import styled from "styled-components";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { Characters, ReadingAndMeaning } from "../SubjectWideBtnList";
import { getSubjectBtnSize } from "../../services/MiscService";
import { ButtonSize } from "../../types/MiscTypes";

type ItemContainerProps = {
  subjtype: SubjectType;
};

const SubjectItemContainer = styled.button<ItemContainerProps>`
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
  width: 100%;
  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding: 8px 8px;
  margin-bottom: 2px;
  border-radius: 10px;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

type Props = {
  subject: Subject;
  btnSize: ButtonSize;
  showDetails?: boolean;
};

export const VocabButton = ({
  subject,
  btnSize,
  showDetails = true,
}: Props) => {
  const navigate = useNavigate();
  const charFontSize = showDetails
    ? getSubjectBtnSize(btnSize).fontSize
    : getSubjectBtnSize(btnSize).fontSizeNoDetails;

  const onSubjBtnClick = (e: any) => {
    navigate(`/subjects/${subject.id}`);
  };

  return (
    <SubjectItemContainer subjtype={subject.object} onClick={onSubjBtnClick}>
      <Characters subject={subject} fontSize={charFontSize} />
      {showDetails && (
        <ReadingAndMeaning
          subject={subject as Vocabulary | KanaVocabulary}
          align="center"
        />
      )}
    </SubjectItemContainer>
  );
};

export default VocabButton;
