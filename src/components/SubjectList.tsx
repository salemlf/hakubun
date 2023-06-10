import { IonCol, IonRow } from "@ionic/react";
import styled from "styled-components/macro";

import {
  Kanji,
  Radical,
  Subject,
  Vocabulary,
  SubjectType,
} from "../types/Subject";
import { SubjectChars } from "./SubjectChars";
import { Assignment } from "../types/Assignment";

import {
  getSubjectDisplayName,
  getPrimaryReading,
} from "../services/SubjectAndAssignmentService";

const Characters = styled(SubjectChars)`
  display: flex;
  flex-direction: column;
`;

const ReadingAndMeaningContainer = styled.div`
  text-align: right;
`;

const ReadingAndMeaningTxt = styled.p`
  margin: 5px 0;
`;

type RadInfoProps = {
  radical: Radical;
};

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

const setBgColor = (subjType: SubjectType) => {
  switch (subjType) {
    case "radical":
      return "var(--wanikani-radical)";
    case "kanji":
      return "var(--wanikani-kanji)";
    case "vocabulary":
      return "var(--wanikani-vocab)";
  }
};

type ItemContainerProps = {
  subjType: SubjectType;
};

const SubjectItemContainer = styled.div<ItemContainerProps>`
  background-color: ${({ subjType }) => setBgColor(subjType)};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  margin-bottom: 2px;
`;

type Props = {
  subject: Subject;
};

const SubjectListItem = ({ subject }: Props) => {
  return (
    <SubjectItemContainer subjType={subject.object}>
      <Characters subject={subject} />
      {subject.object === "radical" && (
        <RadicalInfo radical={subject as Radical} />
      )}

      {subject.object === "kanji" ||
        (subject.object === "vocabulary" && (
          <ReadingAndMeaning subject={subject as Kanji | Vocabulary} />
        ))}
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
  assignmentList: Assignment[];
};

export const SubjectList = ({ subjList, assignmentList }: ListProps) => {
  return (
    <SubjRow>
      {(subjList as Subject[]).map((subject: any) => {
        return (
          <SubjCol key={`col_${subject.id}`}>
            {assignmentList && (
              <>
                <SubjectListItem subject={subject} />
              </>
            )}
          </SubjCol>
        );
      })}
    </SubjRow>
  );
};
