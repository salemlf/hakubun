import { useState } from "react";
import { IonSkeletonText } from "@ionic/react";
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
import { RadicalInfo, ReadingAndMeaning } from "../SubjectWideBtnList";
import styled from "styled-components";

const SubjectList = styled(ToggleGroup.Root)`
  display: flex;
  border-radius: 4px;
  gap: 5px;
  padding: 6px 10px;
  flex-direction: column;
  max-height: 70vh;
  overflow-y: scroll;
`;

type ItemContainerProps = {
  subjtype: SubjectType;
};

// TODO: pass in background color
const SubjectItem = styled(ToggleGroup.Item)<ItemContainerProps>`
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
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

const Characters = styled(SubjectChars)`
  display: flex;
  flex-direction: column;
`;

type Props = {
  assignmentData: Assignment[];
  showMeaning?: boolean;
};

// TODO: use subject wide button list, but instead of going to subject on click select it
// TODO: use showMeaning to hide or show the meaning in subject wide button list (will be hidden for reviews)
// TODO: change name to subject selector?
function AssignmentSelector({ assignmentData, showMeaning = true }: Props) {
  const [selected, setSelected] = useState<string[]>();

  let assignmentSubjIDs = assignmentData.map(
    (assignmentItem: any) => assignmentItem.subject_id
  );

  const { isLoading: subjectsLoading, data: subjectsData } =
    useSubjectsByIDs(assignmentSubjIDs);

  // *testing
  console.log(
    "🚀 ~ file: AssignmentSelector.tsx:11 ~ AssignmentSelector ~ assignmentData:",
    assignmentData
  );
  console.log(
    "🚀 ~ file: AssignmentSelector.tsx:26 ~ AssignmentSelector ~ subjectsData:",
    subjectsData
  );
  // *testing
  return (
    <>
      {!subjectsLoading ? (
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
              {subject.object === "radical" && (
                <RadicalInfo radical={subject as Radical} />
              )}

              {((showMeaning && subject.object === "kanji") ||
                subject.object === "vocabulary" ||
                subject.object === "kana_vocabulary") && (
                <ReadingAndMeaning
                  subject={subject as Kanji | Vocabulary | Kana_Vocabulary}
                />
              )}
            </SubjectItem>
          ))}
        </SubjectList>
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
