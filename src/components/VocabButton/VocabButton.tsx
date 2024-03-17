import { useNavigate } from "react-router";
import { getSubjectBtnSize } from "../../services/MiscService/MiscService";
import { KanaVocabulary, Subject, Vocabulary } from "../../types/Subject";
import { ButtonSize } from "../../types/MiscTypes";
import { Characters, ReadingAndMeaning } from "../SubjectWideBtnList";
import { SubjectItemContainer } from "../../styles/BaseStyledComponents";

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
