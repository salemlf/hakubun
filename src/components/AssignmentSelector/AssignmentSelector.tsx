import { useState } from "react";
// TODO: change so not relying on IonIcon
import { IonSkeletonText, IonIcon } from "@ionic/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
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
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import SubjectChars from "../SubjectChars";
import { RadicalMeaning, ReadingAndMeaning } from "../SubjectWideBtnList";
import CheckCircleIcon from "../../images/check-in-circle.svg";
import styled from "styled-components";

const SubjectList = styled(ToggleGroup.Root)`
  display: flex;
  border-radius: 4px;
  padding: 10px;
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

function sortBySubjectType(arr: Assignment[]): Assignment[] {
  const subjectOrder = ["radical", "kanji", "vocabulary", "kana_vocabulary"];

  return arr.sort((a, b) => {
    const indexA = subjectOrder.indexOf(a.subject_type);
    const indexB = subjectOrder.indexOf(b.subject_type);

    return indexA - indexB;
  });
}

// TODO: use
const sortAssignmentsByTypeAndLevel = (assignments: Assignment[]) => {
  const sortedBySubjTypeArray = sortBySubjectType(assignments);
  console.log(
    "🚀 ~ file: AssignmentSelector.tsx:89 ~ sortAssignmentsByTypeAndLevel ~ sortedBySubjTypeArray:",
    sortedBySubjTypeArray
  );
};

type Props = {
  assignmentData: Assignment[];
  showMeaning?: boolean;
};

// TODO: use animate presence for checkmark
// TODO: show level for review items (when showMeaning is false)
// TODO: sort items by assignment type and then by level
function AssignmentSelector({ assignmentData, showMeaning = true }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  // *testing
  console.log(
    "🚀 ~ file: AssignmentSelector.tsx:65 ~ AssignmentSelector ~ selected:",
    selected
  );
  // *testing

  let assignmentSubjIDs = assignmentData.map(
    (assignmentItem: any) => assignmentItem.subject_id
  );

  const { isLoading: subjectsLoading, data: subjectsData } =
    useSubjectsByIDs(assignmentSubjIDs);

  // *testing
  // console.log(
  //   "🚀 ~ file: AssignmentSelector.tsx:11 ~ AssignmentSelector ~ assignmentData:",
  //   assignmentData
  // );
  console.log(
    "🚀 ~ file: AssignmentSelector.tsx:26 ~ AssignmentSelector ~ subjectsData:",
    subjectsData
  );
  // *testing
  return (
    <>
      {!subjectsLoading ? (
        <>
          <NumSelectedTxt>{selected.length} selected</NumSelectedTxt>
          <SubjectList
            type="multiple"
            value={selected}
            onValueChange={setSelected}
          >
            {(subjectsData as Subject[]).map((subject: Subject) => (
              <SubjectItem
                subjtype={subject.object}
                key={`toggle_item_${subject.id}`}
                value={subject.slug}
              >
                <Characters subject={subject} fontSize="2rem" />
                {showMeaning && subject.object === "radical" && (
                  <RadicalMeaning radical={subject as Radical} />
                )}

                {showMeaning &&
                  (subject.object === "kanji" ||
                    subject.object === "vocabulary" ||
                    subject.object === "kana_vocabulary") && (
                    <ReadingAndMeaning
                      subject={subject as Kanji | Vocabulary | Kana_Vocabulary}
                    />
                  )}
                <Check className="checkmark" src={CheckCircleIcon} />
              </SubjectItem>
            ))}
          </SubjectList>
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "50px" }}
        ></IonSkeletonText>
      )}
    </>
  );
}

export default AssignmentSelector;
