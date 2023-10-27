import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkIfAssignmentTypeInQueue,
  createAssignmentQueueItems,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
  getSubjectTypeDisplayText,
} from "../../services/SubjectAndAssignmentService";
import { capitalizeWord } from "../../services/MiscService";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore";
import { useQueueStore } from "../../stores/useQueueStore";
import { useUserSettingsStore } from "../../stores/useUserSettingsStore";
import { useAssignmentSubmitStore } from "../../stores/useAssignmentSubmitStore";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import {
  ALL_ASSIGNMENT_TYPES,
  MAX_ASSIGNMENTS_BEFORE_SUBMIT,
} from "../../constants";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentBatch, StudyMaterial } from "../../types/MiscTypes";
import { AssignmentSessionType } from "../../types/AssignmentQueueTypes";
import { BackToBackChoice } from "../BackToBackOption/BackToBackOption.types";
import { Subject } from "../../types/Subject";
import BasicAssignmentSettings from "../BasicAssignmentSettings";
import SwipeableTabs from "../SwipeableTabs";
import AdvancedAssignmentSettings from "../AdvancedAssignmentSettings";
import StartSessionButton from "../StartSessionButton";
import LoadingDots from "../LoadingDots";
import Toast from "../Toast";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";
import { AssignmentSortOption } from "../SortOrderOption/SortOrderOption.types";
import { sortAssignmentsWithOption } from "../SortOrderOption/SortOrderOption.service";

type Props = {
  settingsType: AssignmentSessionType;
  // TODO: change so not using "any" type
  assignmentData: any;
  defaultBatchSize: string;
  defaultSortOrder: AssignmentSortOption;
};

function AssignmentSettings({
  settingsType,
  assignmentData,
  defaultBatchSize,
  defaultSortOrder,
}: Props) {
  const navigate = useNavigate();
  const [batchSize, setBatchSize] = useState<string>(defaultBatchSize);
  const backToBackOptionDefault = useUserSettingsStore(
    (state) => state.reviewBackToBackOption
  );
  const [backToBackChoice, setBackToBackChoice] = useState<BackToBackChoice>(
    backToBackOptionDefault
  );
  let [sortOption, setSortOption] =
    useState<AssignmentSortOption>(defaultSortOrder);
  const [selectedTabKey, setSelectedTabKey] = useState<string>("basic");

  const resetQueueStore = useQueueStore((state) => state.resetAll);
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );
  const resetAssignmentSubmit = useAssignmentSubmitStore(
    (state) => state.resetAll
  );
  const [isLoading, setIsLoading] = useState(true);
  const setAssignmentQueueData = useAssignmentQueueStore(
    (state) => state.setAssignmentQueueData
  );
  const setShouldBatchSubmit = useAssignmentSubmitStore(
    (state) => state.setShouldBatchSubmit
  );

  let subjIDs = getSubjIDsFromAssignments(assignmentData);
  let queriesEnabled = subjIDs.length !== 0;

  const { data: subjectsData, isLoading: subjectsLoading } = useSubjectsByIDs(
    subjIDs,
    queriesEnabled
  );
  const { data: studyMaterialsData, isLoading: studyMaterialsLoading } =
    useStudyMaterialsBySubjIDs(subjIDs, queriesEnabled, false);

  useEffect(() => {
    if (
      !subjectsLoading &&
      !studyMaterialsLoading &&
      subjectsData.length !== 0 &&
      studyMaterialsData !== undefined
    ) {
      setIsLoading(false);
    }
  }, [subjectsLoading, studyMaterialsLoading]);

  // needs to be string type for selector, so subject IDs will be converted to number on submit
  const [selectedAdvancedSubjIDs, setSelectedAdvancedSubjIDs] = useState<
    string[]
  >([]);

  const availableAssignmentTypes = ALL_ASSIGNMENT_TYPES.filter(
    (assignmentType) => {
      return checkIfAssignmentTypeInQueue(assignmentData, assignmentType);
    }
  );
  const availableAssignmentTypeNames = availableAssignmentTypes.map(
    (assignmentType) => {
      return {
        name: assignmentType,
        displayName: getSubjectTypeDisplayText(
          assignmentType,
          assignmentType === "radical"
        ),
      };
    }
  );
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState<
    AssignmentType[]
  >(availableAssignmentTypes);
  const [displayToast, setDisplayToast] = useState<boolean>(false);

  let tabBgColor =
    settingsType === "review"
      ? "var(--wanikani-review)"
      : "var(--wanikani-lesson)";
  let showMeaning = settingsType === "lesson";

  const submitWithBasicSettings = (): AssignmentBatch => {
    let assignmentsFiltered = filterAssignmentsByType(
      assignmentData,
      Array.from(selectedAssignmentTypes)
    );

    let sorted = sortAssignmentsWithOption(
      assignmentsFiltered,
      sortOption,
      subjectsData
    );

    const assignmentBatch =
      batchSize === "All"
        ? sorted
        : sorted.slice(0, Number.parseInt(batchSize));
    let subjIDs = getSubjIDsFromAssignments(assignmentBatch);

    return {
      assignmentBatch,
      subjIDs,
    };
  };

  const submitWithAdvancedSettings = (): AssignmentBatch => {
    let subjIDs = selectedAdvancedSubjIDs.map((subjID) => parseInt(subjID));

    let assignmentBatch = assignmentData.filter((assignment: Assignment) => {
      return subjIDs.includes(assignment.subject_id);
    });

    return {
      assignmentBatch,
      subjIDs,
    };
  };

  const onStartSessionBtnClick = () => {
    let noAssignmentsSelected =
      selectedAdvancedSubjIDs.length === 0 &&
      selectedAssignmentTypes.length === 0;
    if (noAssignmentsSelected) {
      setDisplayToast(true);
      return;
    }

    let sessionData =
      selectedAdvancedSubjIDs.length === 0
        ? submitWithBasicSettings()
        : submitWithAdvancedSettings();

    // ending in case some weirdness occurred and there's a review session or lesson quiz in progress
    resetQueueStore();
    resetAssignmentQueue();
    resetAssignmentSubmit();
    setIsLoading(true);

    // getting data for assignment queue
    let subjects = subjectsData.filter((subject: Subject) => {
      return sessionData.subjIDs.includes(subject.id);
    });

    let assignmentQueue = createAssignmentQueueItems(
      sessionData.assignmentBatch,
      subjects,
      studyMaterialsData as StudyMaterial[],
      backToBackChoice
    );

    if (sessionData.assignmentBatch.length > MAX_ASSIGNMENTS_BEFORE_SUBMIT) {
      setShouldBatchSubmit(true);
    }

    setAssignmentQueueData(assignmentQueue, settingsType);

    if (settingsType === "review") {
      navigate("/reviews/session", { replace: true });
    } else {
      navigate("/lessons/session", { replace: true });
    }
  };

  return (
    <>
      {isLoading ? (
        <FixedCenterContainer>
          <LoadingDots />
        </FixedCenterContainer>
      ) : (
        <>
          <SwipeableTabs
            selectedTabKey={selectedTabKey}
            setSelectedTabKey={setSelectedTabKey}
            tabBgColor={tabBgColor}
            tabSelectionColor="black"
            roundedContainer={false}
            tabs={[
              {
                id: "basic",
                label: "Basic",
                tabContents: (
                  <BasicAssignmentSettings
                    availableAssignmentTypeNames={availableAssignmentTypeNames}
                    assignmentData={assignmentData}
                    defaultBatchSize={batchSize}
                    setBatchSize={setBatchSize}
                    selectedAssignmentTypes={selectedAssignmentTypes}
                    setSelectedAssignmentTypes={setSelectedAssignmentTypes}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    showBackToBackOption={settingsType === "review"}
                    backToBackChoice={backToBackChoice}
                    setBackToBackChoice={setBackToBackChoice}
                  />
                ),
              },
              {
                id: "advanced",
                label: "Advanced",
                tabContents: (
                  <AdvancedAssignmentSettings
                    selectedAdvancedSubjIDs={selectedAdvancedSubjIDs}
                    setSelectedAdvancedSubjIDs={setSelectedAdvancedSubjIDs}
                    showMeaning={showMeaning}
                    assignmentData={assignmentData}
                    availableAssignmentTypeNames={availableAssignmentTypeNames}
                    availableAssignmentTypes={availableAssignmentTypes}
                    showBackToBackOption={settingsType === "review"}
                    backToBackChoice={backToBackChoice}
                    setBackToBackChoice={setBackToBackChoice}
                    settingsType={settingsType}
                  />
                ),
              },
            ]}
            defaultValue="basic"
            scrollToDefault={false}
          />
          <Toast
            open={displayToast}
            setOpen={setDisplayToast}
            title={`No ${capitalizeWord(settingsType)}s Selected`}
            content={`Select some ${settingsType}s using the settings above`}
            toastType="error"
          ></Toast>
          <StartSessionButton
            onStartBtnClick={onStartSessionBtnClick}
            buttonType={settingsType}
          />
        </>
      )}
    </>
  );
}

export default AssignmentSettings;
