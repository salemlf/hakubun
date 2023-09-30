import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkIfAssignmentTypeInQueue,
  compareAssignmentsByAvailableDate,
  createAssignmentQueueItems,
  filterAssignmentsByType,
  getSubjIDsFromAssignments,
} from "../../services/SubjectAndAssignmentService";
import { capitalizeWord } from "../../services/MiscService";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore";
import { useQueueStore } from "../../stores/useQueueStore";
import { useSubjectsByIDs } from "../../hooks/useSubjectsByIDs";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { ALL_ASSIGNMENT_TYPES } from "../../constants";
import { Assignment, AssignmentType } from "../../types/Assignment";
import { AssignmentBatch, StudyMaterial } from "../../types/MiscTypes";
import BasicAssignmentSettings from "../BasicAssignmentSettings";
import SwipeableTabs from "../SwipeableTabs";
import AdvancedAssignmentSettings from "../AdvancedAssignmentSettings";
import StartSessionButton from "../StartSessionButton";
import LoadingDots from "../LoadingDots";
import Toast from "../Toast";
import { FixedCenterContainer } from "../../styles/BaseStyledComponents";

type Props = {
  settingsType: "lessons" | "reviews";
  // TODO: change so not using "any" type
  assignmentData: any;
  defaultBatchSize: number;
};

function AssignmentSettings({
  settingsType,
  assignmentData,
  defaultBatchSize,
}: Props) {
  const navigate = useNavigate();
  const [batchSize, setBatchSize] = useState<number>(defaultBatchSize);
  const [selectedTabKey, setSelectedTabKey] = useState<string>("basic");

  const resetQueueStore = useQueueStore.use.resetAll();
  const resetAssignmentQueue = useAssignmentQueueStore.use.resetAll();
  const [isLoading, setIsLoading] = useState(false);
  const setAssignmentQueueData =
    useAssignmentQueueStore.use.setAssignmentQueueData();

  const [subjIDs, setSubjIDs] = useState<number[]>([]);
  const [assignmentBatch, setAssignmentBatch] = useState<Assignment[]>([]);
  let queriesEnabled = subjIDs.length !== 0 && assignmentBatch.length !== 0;
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
      let assignmentQueue = createAssignmentQueueItems(
        assignmentBatch,
        subjectsData,
        studyMaterialsData as StudyMaterial[]
      );

      setAssignmentQueueData(assignmentQueue);

      if (settingsType === "reviews") {
        navigate("/reviews/session", { replace: true });
      } else {
        navigate("/lessons/session", { replace: true });
      }
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
  const [selectedAssignmentTypes, setSelectedAssignmentTypes] = useState<
    AssignmentType[]
  >(availableAssignmentTypes);
  const [displayToast, setDisplayToast] = useState<boolean>(false);

  let tabBgColor =
    settingsType === "reviews"
      ? "var(--wanikani-review)"
      : "var(--wanikani-lesson)";
  let showMeaning = settingsType === "lessons";

  const submitWithBasicSettings = (): AssignmentBatch => {
    let assignmentsFiltered = filterAssignmentsByType(
      assignmentData,
      Array.from(selectedAssignmentTypes)
    );

    //TODO: sorting by available date ascending as default (oldest to newest), add other sort options
    let assignmentsByAvailDate = assignmentsFiltered.sort(
      compareAssignmentsByAvailableDate
    );

    let assignmentBatch = assignmentsByAvailDate.slice(0, batchSize);
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

    // getting data for assignment queue
    setIsLoading(true);
    setSubjIDs(sessionData.subjIDs);
    setAssignmentBatch(sessionData.assignmentBatch);
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
                    availableAssignmentTypes={availableAssignmentTypes}
                    assignmentData={assignmentData}
                    defaultBatchSize={batchSize}
                    setBatchSize={setBatchSize}
                    selectedAssignmentTypes={selectedAssignmentTypes}
                    setSelectedAssignmentTypes={setSelectedAssignmentTypes}
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
            title={`No ${capitalizeWord(settingsType)} Selected`}
            content={`Select some ${settingsType} using the settings above`}
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
