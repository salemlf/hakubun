import { useEffect, useState } from "react";
// TODO: change so not relying on IonIcon
import { IonSkeletonText, IonIcon } from "@ionic/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { getSubjectColor } from "../../services/SubjectAndAssignmentService";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Assignment } from "../../types/Assignment";
import {
  KanaVocabulary,
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
import { AnimatePresence, motion } from "framer-motion";

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

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

const CheckIconContainer = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -10px;
`;

const Check = styled(IonIcon)`
  width: 2.5em;
  height: 2.5em;
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
  selectedAdvancedSubjIDs: string[];
  setSelectedAdvancedSubjIDs: React.Dispatch<React.SetStateAction<string[]>>;
  showMeaning?: boolean;
};

// TODO: improve "no assignments available" message
function AssignmentSelector({
  assignmentData,
  selectedAdvancedSubjIDs,
  setSelectedAdvancedSubjIDs,
  showMeaning = true,
}: Props) {
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
          <NumSelectedTxt>
            {selectedAdvancedSubjIDs.length} selected
          </NumSelectedTxt>
          <SubjectList
            type="multiple"
            value={selectedAdvancedSubjIDs}
            onValueChange={setSelectedAdvancedSubjIDs}
          >
            {(availableSubjects as Subject[]).map((subject: Subject) => (
              <SubjectItem
                subjtype={subject.object}
                key={`toggle_item_${subject.id}`}
                value={`${subject.id}`}
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
                      subject={subject as Kanji | Vocabulary | KanaVocabulary}
                    />
                  )
                ) : (
                  <LvlBadge>Lvl {subject.level}</LvlBadge>
                )}
                <AnimatePresence>
                  {selectedAdvancedSubjIDs.includes(`${subject.id}`) && (
                    <CheckIconContainer
                      key={`${subject.id}`}
                      transition={{
                        type: "spring",
                        duration: 0.75,
                        bounce: 0.5,
                      }}
                      initial={{ scale: 0, rotate: 90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 90 }}
                    >
                      <Check className="checkmark" src={CheckCircleIcon} />
                    </CheckIconContainer>
                  )}
                </AnimatePresence>
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
