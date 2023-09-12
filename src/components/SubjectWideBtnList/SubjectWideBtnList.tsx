import { IonCol, IonRow } from "@ionic/react";
import { useNavigate } from "react-router-dom";
import { setSubjectAvailImgs } from "../../services/ImageSrcService";
import {
  getSubjectDisplayName,
  getPrimaryReading,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService";
import {
  Radical,
  Kanji,
  Vocabulary,
  SubjectType,
  Subject,
  KanaVocabulary,
} from "../../types/Subject";
import SubjectChars from "../SubjectChars";
import styled from "styled-components";

export const Characters = styled(SubjectChars)`
  display: flex;
  flex-direction: column;
`;

const ReadingAndMeaningContainer = styled.div`
  text-align: right;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
`;

const ReadingAndMeaningTxt = styled.p`
  margin: 5px 0;
`;

const ReadingTxt = styled(ReadingAndMeaningTxt)`
  font-family: var(--japanese-font-family);
`;

type RadInfoProps = {
  radical: Radical;
};

export const RadicalMeaning = ({ radical }: RadInfoProps) => {
  return (
    <ReadingAndMeaningContainer>
      <ReadingAndMeaningTxt>
        {getSubjectDisplayName(radical)}
      </ReadingAndMeaningTxt>
    </ReadingAndMeaningContainer>
  );
};

type ReadingMeaningProps = {
  subject: Kanji | Vocabulary | KanaVocabulary;
};

export const ReadingAndMeaning = ({ subject }: ReadingMeaningProps) => {
  let hasReadings = subject.readings && subject.readings.length !== 0;
  return (
    <ReadingAndMeaningContainer>
      {hasReadings && (
        <ReadingTxt>{getPrimaryReading(subject.readings!)}</ReadingTxt>
      )}
      <ReadingAndMeaningTxt>
        {getSubjectDisplayName(subject)}
      </ReadingAndMeaningTxt>
    </ReadingAndMeaningContainer>
  );
};

type ItemContainerProps = {
  subjtype: SubjectType;
};

const SubjectItemContainer = styled.button<ItemContainerProps>`
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  margin-bottom: 2px;
  border-radius: 10px;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

type Props = {
  subject: Subject;
  findImages?: boolean;
};

export const SubjectWideButton = ({ subject, findImages = false }: Props) => {
  const navigate = useNavigate();
  if (subject.object === "radical" && findImages) {
    let updatedSubj = setSubjectAvailImgs(subject);
    subject = updatedSubj;
  }

  const onSubjBtnClick = (e: any) => {
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

const SubjCol = styled(IonCol)`
  flex-basis: 100%;
  display: flex;
  padding: 0;
`;

const SubjRow = styled(IonRow)`
  margin-left: -3px;
`;

type ListProps = {
  subjList: Subject[];
};

function SubjectWideBtnList({ subjList }: ListProps) {
  return (
    <SubjRow>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            <>
              <SubjectWideButton subject={subject} />
            </>
          </SubjCol>
        );
      })}
    </SubjRow>
  );
}

export default SubjectWideBtnList;
