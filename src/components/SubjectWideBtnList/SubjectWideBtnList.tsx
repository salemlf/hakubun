import { useNavigate } from "react-router-dom";
import { setSubjectAvailImgs } from "../../services/ImageSrcService/ImageSrcService";
import {
  getSubjectDisplayName,
  getPrimaryReading,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import {
  Radical,
  Kanji,
  Vocabulary,
  Subject,
  KanaVocabulary,
} from "../../types/Subject";
import SubjectChars from "../SubjectChars";
import { SubjectItemContainer } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

export const Characters = styled(SubjectChars)`
  display: flex;
  flex-direction: column;
`;

const MeaningContainer = styled.div`
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

type ReadingAndMeaningContainerProps = {
  align: string;
};

const ReadingAndMeaningContainer = styled(
  MeaningContainer
)<ReadingAndMeaningContainerProps>`
  /* text-align: right; */
  text-align: ${({ align }) => align};
`;

const RadicalMeaningContainer = styled(MeaningContainer)`
  text-align: right;
`;

const ReadingAndMeaningTxt = styled.p`
  margin: 5px 0;
  color: white;
`;

const ReadingTxt = styled(ReadingAndMeaningTxt)`
  font-family: var(--japanese-font-family);
`;

type RadInfoProps = {
  radical: Radical;
};

export const RadicalMeaning = ({ radical }: RadInfoProps) => {
  return (
    <RadicalMeaningContainer>
      <ReadingAndMeaningTxt>
        {getSubjectDisplayName(radical)}
      </ReadingAndMeaningTxt>
    </RadicalMeaningContainer>
  );
};

type ReadingMeaningProps = {
  subject: Kanji | Vocabulary | KanaVocabulary;
  align?: string;
};

export const ReadingAndMeaning = ({
  subject,
  align = "right",
}: ReadingMeaningProps) => {
  const hasReadings = subject.readings && subject.readings.length !== 0;
  return (
    <ReadingAndMeaningContainer align={align}>
      {hasReadings && (
        <ReadingTxt>{getPrimaryReading(subject.readings!)}</ReadingTxt>
      )}
      <ReadingAndMeaningTxt>
        {getSubjectDisplayName(subject)}
      </ReadingAndMeaningTxt>
    </ReadingAndMeaningContainer>
  );
};

type Props = {
  subject: Subject;
  findImages?: boolean;
};

export const SubjectWideButton = ({ subject, findImages = false }: Props) => {
  const navigate = useNavigate();
  if (subject.object === "radical" && findImages) {
    const updatedSubj = setSubjectAvailImgs(subject);
    subject = updatedSubj;
  }

  const onSubjBtnClick = () => {
    navigate(`/subjects/${subject.id}`);
  };

  return (
    <SubjectItemContainer subjtype={subject.object} onClick={onSubjBtnClick}>
      <Characters subject={subject} fontSize="2rem" />
      {subject.object === "radical" && (
        <RadicalMeaning radical={subject as Radical} />
      )}

      {(subject.object === "kanji" ||
        subject.object === "vocabulary" ||
        subject.object === "kana_vocabulary") && (
        <ReadingAndMeaning
          subject={subject as Kanji | Vocabulary | KanaVocabulary}
        />
      )}
    </SubjectItemContainer>
  );
};

const ListContainer = styled.div`
  margin-left: -3px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

type ListProps = {
  subjList: Subject[];
};

function SubjectWideBtnList({ subjList }: ListProps) {
  return (
    <ListContainer>
      {(subjList as Subject[]).map((subject) => {
        return (
          <SubjectWideButton subject={subject} key={`wide_btn_${subject.id}`} />
        );
      })}
    </ListContainer>
  );
}

export default SubjectWideBtnList;
