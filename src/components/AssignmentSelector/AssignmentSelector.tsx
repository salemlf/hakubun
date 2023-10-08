import { useEffect, useState } from "react";
// TODO: change so not relying on IonIcon
import { IonSkeletonText, IonIcon } from "@ionic/react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "framer-motion";
import {
  filterSubjectsByLevel,
  filterSubjectsByType,
  getSubjectColor,
} from "../../services/SubjectAndAssignmentService";
import { useUserInfoStore } from "../../stores/useUserInfoStore";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { Assignment, AssignmentType } from "../../types/Assignment";
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
import Button from "../Button";
import CheckCircleIcon from "../../images/check-in-circle.svg";
import RemoveIcon from "../../images/close.svg";
import CheckIcon from "../../images/checkmark.svg";
import styled from "styled-components";

const SubjectList = styled(ToggleGroup.Root)`
  display: flex;
  border-radius: 4px;
  padding: 15px 10px 32px;
  flex-wrap: wrap;
  max-height: 65vh;
  overflow-y: scroll;
  align-items: center;
  justify-content: center;
`;

type ItemContainerProps = {
  subjtype: SubjectType;
};

const SubjectItem = styled(motion.button)<ItemContainerProps>`
  background-color: ${({ subjtype }) => getSubjectColor(subjtype)};
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 10px;
  gap: 10px;
  flex-basis: 100%;

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

const LvlBubble = styled.p`
  background-color: var(--ion-color-secondary);
  color: white;
  margin: 0;
  padding: 6px;
  border-radius: 0.8rem;
  border: 1px solid white;
`;

const NoAssignmentsTxt = styled.p`
  margin: 16px;
`;

const SelectedInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 12px 8px 12px;
`;

const NumSelectedTxt = styled.h2`
  margin: 0;
  padding-right: 10px;
  font-size: 1.25rem;
`;

const ButtonWrapper = styled(motion.div)`
  margin: 0;
  padding: 0;
`;

const SelectDeselectAllButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  padding: 5px;
  border-radius: 8px;
`;

const SelectDeselectIcon = styled(IonIcon)`
  width: 1.5em;
  height: 1.5em;
`;

// TODO: move this to more general file
const sortBySubjectTypeAndLevel = (subjArr: Subject[]): Subject[] => {
  const subjectOrder: SubjectType[] = [
    "radical",
    "kanji",
    "vocabulary",
    "kana_vocabulary",
  ];

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
  filterByCurrentLevel: boolean;
  assignmentTypeFilter?: AssignmentType[];
  showMeaning?: boolean;
};

// TODO: break this down into smaller components
// TODO: allow different sort orders
function AssignmentSelector({
  assignmentData,
  selectedAdvancedSubjIDs,
  setSelectedAdvancedSubjIDs,
  assignmentTypeFilter,
  filterByCurrentLevel,
  showMeaning = true,
}: Props) {
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);
  const [areAllSelected, setAreAllSelected] = useState<boolean>(false);
  const userInfo = useUserInfoStore.use.userInfo();

  let assignmentSubjIDs = assignmentData.map(
    (assignmentItem: any) => assignmentItem.subject_id
  );

  const { isLoading: subjectsLoading, data: subjectsData } =
    useSubjectsByIDs(assignmentSubjIDs);

  useEffect(() => {
    if (subjectsData) {
      let sortedAssignments = sortBySubjectTypeAndLevel(subjectsData);

      let subjectsFiltered = assignmentTypeFilter
        ? filterSubjectsByType(
            sortedAssignments,
            Array.from(assignmentTypeFilter)
          )
        : sortedAssignments;

      let subjectsFilteredByLevel =
        filterByCurrentLevel && userInfo && userInfo.level
          ? filterSubjectsByLevel(subjectsFiltered, userInfo.level)
          : subjectsFiltered;

      setAvailableSubjects(subjectsFilteredByLevel);
    }
  }, [subjectsLoading, assignmentTypeFilter, filterByCurrentLevel]);

  const onSelectDeselectAllPress = () => {
    if (areAllSelected) {
      setSelectedAdvancedSubjIDs([]);
    } else {
      setSelectedAdvancedSubjIDs(
        availableSubjects.map((subject) => `${subject.id}`)
      );
    }
    setAreAllSelected(!areAllSelected);
  };

  return (
    <>
      {availableSubjects ? (
        availableSubjects.length === 0 ? (
          <NoAssignmentsTxt>
            Hmm, looks like we can't find any assignments using those filters...
          </NoAssignmentsTxt>
        ) : (
          <>
            <SelectedInfoContainer>
              <NumSelectedTxt>
                {selectedAdvancedSubjIDs.length} selected
              </NumSelectedTxt>
              <AnimatePresence mode="wait">
                {areAllSelected ? (
                  <ButtonWrapper
                    key="deselect_all"
                    transition={{
                      type: "spring",
                      duration: 0.5,
                      bounce: 0.5,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <SelectDeselectAllButton
                      onPress={onSelectDeselectAllPress}
                      backgroundColor="var(--ion-color-danger)"
                    >
                      Deselect All
                      <SelectDeselectIcon src={RemoveIcon} />
                    </SelectDeselectAllButton>
                  </ButtonWrapper>
                ) : (
                  <ButtonWrapper
                    key="select_all"
                    transition={{
                      type: "spring",
                      duration: 0.75,
                      bounce: 0.5,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <SelectDeselectAllButton
                      onPress={onSelectDeselectAllPress}
                      backgroundColor="var(--ion-color-tertiary)"
                      color="black"
                    >
                      Select All
                      <SelectDeselectIcon
                        src={areAllSelected ? RemoveIcon : CheckIcon}
                      />
                    </SelectDeselectAllButton>
                  </ButtonWrapper>
                )}
              </AnimatePresence>
            </SelectedInfoContainer>
            <SubjectList
              type="multiple"
              value={selectedAdvancedSubjIDs}
              onValueChange={setSelectedAdvancedSubjIDs}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {(availableSubjects as Subject[]).map(
                  (subject: Subject, index: number) => (
                    <ToggleGroup.Item
                      value={`${subject.id}`}
                      key={`toggle_item_${subject.id}`}
                      asChild
                    >
                      <SubjectItem
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          opacity: { duration: 0.2 },
                          scale: { duration: 0.2 },
                          layout: {
                            type: "spring",
                            bounce: 0.2,
                            duration: Math.max(0.2, Math.min(index * 0.2, 2)),
                          },
                        }}
                        subjtype={subject.object}
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
                              subject={
                                subject as Kanji | Vocabulary | KanaVocabulary
                              }
                            />
                          )
                        ) : (
                          <LvlBubble>Lvl {subject.level}</LvlBubble>
                        )}
                        <AnimatePresence>
                          {selectedAdvancedSubjIDs.includes(
                            `${subject.id}`
                          ) && (
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
                              <Check
                                className="checkmark"
                                src={CheckCircleIcon}
                              />
                            </CheckIconContainer>
                          )}
                        </AnimatePresence>
                      </SubjectItem>
                    </ToggleGroup.Item>
                  )
                )}
              </AnimatePresence>
            </SubjectList>
          </>
        )
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
