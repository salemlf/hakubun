import { useIonRouter, IonCol, IonRow } from "@ionic/react";
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
} from "../../types/Subject";
import SubjectChars from "../SubjectChars";
import styled from "styled-components/macro";

const Characters = styled(SubjectChars)`
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

type RadInfoProps = {
  radical: Radical;
};

// TODO: switch to CSS text-transform: capitalize instead of capitalizeWord for ReadingAndMeaningTxt
const RadicalInfo = ({ radical }: RadInfoProps) => {
  return (
    <ReadingAndMeaningContainer>
      <ReadingAndMeaningTxt>
        {getSubjectDisplayName(radical)}
      </ReadingAndMeaningTxt>
    </ReadingAndMeaningContainer>
  );
};

type ReadingMeaningProps = {
  subject: Kanji | Vocabulary;
};

// TODO: account for kana vocab where there's no reading (since reading would just be characters)
const ReadingAndMeaning = ({ subject }: ReadingMeaningProps) => {
  let hasReadings = subject.readings && subject.readings.length !== 0;
  return (
    <ReadingAndMeaningContainer>
      {hasReadings && (
        <ReadingAndMeaningTxt>
          {getPrimaryReading(subject.readings!)}
        </ReadingAndMeaningTxt>
      )}
      <ReadingAndMeaningTxt>
        {getSubjectDisplayName(subject)}
      </ReadingAndMeaningTxt>
    </ReadingAndMeaningContainer>
  );
};

type ItemContainerProps = {
  subjType: SubjectType;
};

const SubjectItemContainer = styled.button<ItemContainerProps>`
  background-color: ${({ subjType }) => getSubjectColor(subjType)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  margin-bottom: 2px;
  border-radius: 10px;

  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

type Props = {
  subject: Subject;
  findImages?: boolean;
};

export const SubjectWideButton = ({ subject, findImages = false }: Props) => {
  if (subject.object === "radical" && findImages) {
    let updatedSubj = setSubjectAvailImgs(subject);
    subject = updatedSubj;
  }

  const router = useIonRouter();

  const onSubjBtnClick = (e: any) => {
    router.push(`/subjects/${subject.id}`);
  };

  return (
    <SubjectItemContainer subjType={subject.object} onClick={onSubjBtnClick}>
      <Characters subject={subject} fontSize="2rem" />
      {subject.object === "radical" && (
        <RadicalInfo radical={subject as Radical} />
      )}

      {(subject.object === "kanji" || subject.object === "vocabulary") && (
        <ReadingAndMeaning subject={subject as Kanji | Vocabulary} />
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
