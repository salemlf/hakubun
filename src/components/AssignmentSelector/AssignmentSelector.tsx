import { useEffect, useState } from "react";
// TODO: change so not relying on IonIcon
import { IonSkeletonText, IonIcon } from "@ionic/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Assignment } from "../../types/Assignment";
import {
  Kana_Vocabulary,
  Kanji,
  Radical,
  Subject,
  SubjectType,
  Vocabulary,
} from "../../types/Subject";
import SubjectChars from "../SubjectChars";
import { RadicalMeaning, ReadingAndMeaning } from "../SubjectWideBtnList";
import CheckCircleIcon from "../../images/check-in-circle.svg";
import styled from "styled-components";

const SubjectList = styled(ToggleGroup.Root)`
  display: flex;
  border-radius: 4px;
  padding: 15px 10px;
  flex-direction: column;
  max-height: 65vh;
  overflow-y: scroll;
`;

type ItemContainerProps = {
  subjtype: SubjectType;
};

const SubjectItem = styled(ToggleGroup.Item)<ItemContainerProps>`
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 10px;

  &:focus {
    outline: 2px solid white;
    --outline: 2px solid white;
  }

  &[data-state="on"] {
    .checkmark {
      display: block;
    }
  }
`;

const Check = styled(IonIcon)`
  position: absolute;
  top: -10px;
  right: -10px;
  width: 2.5em;
  height: 2.5em;
  display: none;
`;

const Characters = styled(SubjectChars)`
  display: flex;
  flex-direction: column;
`;

const NumSelectedTxt = styled.h2`
  margin: 16px 12px 12px 12px;
  font-size: 1.25rem;
`;

const LvlBadge = styled.p`
  background-color: var(--ion-color-secondary);
  margin: 0;
  padding: 6px;
  border-radius: 0.8rem;
  border: 1px solid white;
`;

const sortBySubjectTypeAndLevel = (subjArr: Subject[]): Subject[] => {
  const subjectOrder = ["radical", "kanji", "vocabulary", "kana_vocabulary"];

  return subjArr.sort((subjA, subjB) => {
    const indexA = subjectOrder.indexOf(subjA.object);
    const indexB = subjectOrder.indexOf(subjB.object);
    if (indexA !== indexB) {
      return indexA - indexB;
    }

    // if same subject type, sort by level
    return subjA.level - subjB.level;
  });
};

type Props = {
  assignmentData: Assignment[];
  showMeaning?: boolean;
};

// TODO: use animate presence for checkmark
// TODO: improve "no assignments available" message
function AssignmentSelector({ assignmentData, showMeaning = true }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);

  let assignmentSubjIDs = assignmentData.map(
    (assignmentItem: any) => assignmentItem.subject_id
  );

  const { isLoading: subjectsLoading, data: subjectsData } =
    useSubjectsByIDs(assignmentSubjIDs);

  useEffect(() => {
    if (subjectsData) {
      let sortedAssignments = sortBySubjectTypeAndLevel(subjectsData);
      setAvailableSubjects(sortedAssignments);
    }
  }, [subjectsLoading]);

  return (
    <>
      {availableSubjects && availableSubjects.length !== 0 ? (
        <>
          <NumSelectedTxt>{selected.length} selected</NumSelectedTxt>
          <SubjectList
            type="multiple"
            value={selected}
            onValueChange={setSelected}
          >
            {(availableSubjects as Subject[]).map((subject: Subject) => (
              <SubjectItem
                subjtype={subject.object}
                key={`toggle_item_${subject.id}`}
                value={subject.slug}
              >
                <Characters subject={subject} fontSize="2rem" />
                {showMeaning && subject.object === "radical" && (
                  <RadicalMeaning radical={subject as Radical} />
                )}

                {showMeaning ? (
                  (subject.object === "kanji" ||
                    subject.object === "vocabulary" ||
                    subject.object === "kana_vocabulary") && (
                    <ReadingAndMeaning
                      subject={subject as Kanji | Vocabulary | Kana_Vocabulary}
                    />
                  )
                ) : (
                  <LvlBadge>Lvl {subject.level}</LvlBadge>
                )}
                <Check className="checkmark" src={CheckCircleIcon} />
              </SubjectItem>
            ))}
          </SubjectList>
        </>
      ) : availableSubjects ? (
        <IonSkeletonText
          animated={true}
          style={{ height: "50px" }}
        ></IonSkeletonText>
      ) : (
        <p>No assignments available</p>
      )}
    </>
  );
}

export default AssignmentSelector;
