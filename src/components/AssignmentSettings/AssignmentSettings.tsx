import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import useQueueStoreFacade from "../../stores/useQueueStore/useQueueStore.facade";
import useAssignmentSubmitStoreFacade from "../../stores/useAssignmentSubmitStore/useAssignmentSubmitStore.facade";
import { useAssignmentSettingsCtxStore } from "../../stores/useAssignmentSettingsCtxStore/useAssignmentSettingsCtxStore";
import {
  checkIfAssignmentTypeInQueue,
  createAssignmentQueueItems,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
  getSubjectTypeDisplayText,
} from "../../services/SubjectAndAssignmentService/SubjectAndAssignmentService";
import { capitalizeWord } from "../../services/MiscService/MiscService";
import { displayToast } from "../Toast/Toast.service";
import { sortAssignmentsWithOption } from "../SortOrderOption/SortOrderOption.service";
import { useSubjectsByIDs } from "../../hooks/subjects/useSubjectsByIDs";
import { useStudyMaterialsBySubjIDs } from "../../hooks/study-materials/useStudyMaterialsBySubjIDs";
import {
  ALL_SUBJECT_TYPES,
  MAX_ASSIGNMENTS_BEFORE_SUBMIT,
} from "../../constants";
import { Assignment } from "../../types/Assignment";
import { AssignmentBatch } from "../../types/MiscTypes";
import { Subject, SubjectType } from "../../types/Subject";
import BasicAssignmentSettings from "../BasicAssignmentSettings";
import AdvancedAssignmentSettings from "../AdvancedAssignmentSettings";
import StartSessionButton from "../StartSessionButton";
import Tabs from "../Tabs";

export type AssignmentSettingsProps = {
  assignmentData: Assignment[];
};

function AssignmentSettings({ assignmentData }: AssignmentSettingsProps) {
  const navigate = useNavigate();
  const settingsType = useAssignmentSettingsCtxStore((s) => s.settingsType);
  const sortOption = useAssignmentSettingsCtxStore((s) => s.sortOption);
  const batchSize = useAssignmentSettingsCtxStore((s) => s.batchSize);
  const backToBackChoice = useAssignmentSettingsCtxStore(
    (s) => s.backToBackChoice
  );

  const [selectedTabKey, setSelectedTabKey] = useState<string>("basic");

  const { resetAll: resetQueueStore } = useQueueStoreFacade();
  const resetAssignmentQueue = useAssignmentQueueStore(
    (state) => state.resetAll
  );
  const { resetAll: resetAssignmentSubmit, setShouldBatchSubmit } =
    useAssignmentSubmitStoreFacade();
  const setAssignmentQueueData = useAssignmentQueueStore(
    (state) => state.setAssignmentQueueData
  );
  const [isLoading, setIsLoading] = useState(true);

  const subjIDs = getSubjIDsFromAssignments(assignmentData);
  const queriesEnabled = subjIDs.length !== 0;

  const { data: subjectsData, isLoading: subjectsLoading } = useSubjectsByIDs(
    subjIDs,
    queriesEnabled
  );
  const { data: studyMaterialsData, isLoading: studyMaterialsLoading } =
    useStudyMaterialsBySubjIDs(subjIDs, queriesEnabled);

  useEffect(() => {
    if (
      !subjectsLoading &&
      !studyMaterialsLoading &&
      subjectsData &&
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

  const availableAssignmentTypes = ALL_SUBJECT_TYPES.filter(
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
    SubjectType[]
  >(availableAssignmentTypes);

  const tabBgColor =
    settingsType === "review"
      ? "var(--wanikani-review)"
      : "var(--wanikani-lesson)";
  const showMeaning = settingsType === "lesson";

  const submitWithBasicSettings = (subjData: Subject[]): AssignmentBatch => {
    const assignmentsFiltered = filterAssignmentsByType(
      assignmentData,
      Array.from(selectedAssignmentTypes)
    );

    const sorted = sortAssignmentsWithOption(
      assignmentsFiltered,
      sortOption,
      subjData
    );

    const assignmentBatch =
      batchSize === "All"
        ? sorted
        : sorted.slice(0, Number.parseInt(batchSize));
    const subjIDs = getSubjIDsFromAssignments(assignmentBatch);

    return {
      assignmentBatch,
      subjIDs,
    };
  };

  const submitWithAdvancedSettings = (): AssignmentBatch => {
    const subjIDs = selectedAdvancedSubjIDs.map((subjID) => parseInt(subjID));

    const assignmentBatch = assignmentData.filter((assignment: Assignment) => {
      return subjIDs.includes(assignment.subject_id);
    });

    return {
      assignmentBatch,
      subjIDs,
    };
  };

  const onStartSessionBtnClick = () => {
    const noAssignmentsSelected =
      selectedAdvancedSubjIDs.length === 0 &&
      selectedAssignmentTypes.length === 0;
    if (noAssignmentsSelected) {
      displayToast({
        title: `No ${capitalizeWord(settingsType)}s Selected`,
        content: `Select some ${settingsType}s using the settings above`,
        toastType: "error",
        timeout: 10000,
      });
      return;
    }

    if (!subjectsData) {
      displayToast({
        toastType: "error",
        title: "No Subjects Found",
        content:
          "Unable to start session. No subjects were returned from the server, oh no!",
        timeout: 10000,
      });
      return;
    }

    const sessionData =
      selectedAdvancedSubjIDs.length === 0
        ? submitWithBasicSettings(subjectsData)
        : submitWithAdvancedSettings();

    // ending in case some weirdness occurred and there's a review session or lesson quiz in progress
    resetQueueStore();
    resetAssignmentQueue();
    resetAssignmentSubmit();
    setIsLoading(true);

    // getting data for assignment queue
    const subjects = subjectsData.filter((subject: Subject) => {
      return sessionData.subjIDs.includes(subject.id);
    });

    const batch = sessionData.assignmentBatch;
    const assignmentQueue = createAssignmentQueueItems(
      batch,
      subjects,
      studyMaterialsData ?? [],
      backToBackChoice
    );

    if (batch.length > MAX_ASSIGNMENTS_BEFORE_SUBMIT) {
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
      {!isLoading && (
        <>
          <Tabs
            id="assignmentSettingsTabs"
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
                    selectedAssignmentTypes={selectedAssignmentTypes}
                    setSelectedAssignmentTypes={setSelectedAssignmentTypes}
                    showBackToBackOption={settingsType === "review"}
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
                  />
                ),
              },
            ]}
          />
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
