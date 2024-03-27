import {
  constructStudyMaterialData,
  updateValsInStudyMaterialData,
} from "../../services/MiscService/MiscService";
import { useAssignmentQueueStore } from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore";
import { useCreateStudyMaterials } from "./useCreateStudyMaterials";
import { useUpdateStudyMaterials } from "./useUpdateStudyMaterials";
import { Subject } from "../../types/Subject";
import {
  StudyMaterial,
  StudyMaterialDataResponse,
  StudyMaterialPostData,
} from "../../types/StudyMaterial";

type StudyMaterialsChangeActionType = "add" | "remove";

type StudyMaterialsChangeMethod = "create" | "update";

type ActionDictionary = {
  [key in StudyMaterialsChangeMethod]:
    | ActionUpdateFunction
    | ActionCreateFunction;
};

// TODO: use RequireAtLeastOne to make at least one of optional params required
interface ActionParams {
  subject?: Subject;
  studyMaterialData: StudyMaterialDataResponse | undefined;
  userMeaningToUpdate?: string;
  meaningNoteToUpdate?: string;
  readingNoteToUpdate?: string;
}

interface ActionCreateParams extends ActionParams {
  subject: Subject;
}

interface ActionUpdateParams extends ActionParams {
  actionType: StudyMaterialsChangeActionType;
}

type ActionUpdateFunction = (params: ActionUpdateParams) => void;

type ActionCreateFunction = (params: ActionCreateParams) => void;

export const useStudyMaterialsChange = () => {
  const { mutateAsync: createStudyMaterials } = useCreateStudyMaterials();
  const { mutateAsync: updateStudyMaterials } = useUpdateStudyMaterials();
  const isSessionInProgress = useAssignmentQueueStore(
    (state) => state.sessionInProgress
  );
  const updateQueueItemAltMeanings = useAssignmentQueueStore(
    (state) => state.updateQueueItemAltMeanings
  );

  const getDataChangeMethod = (
    studyMaterialData: StudyMaterialDataResponse | undefined
  ): StudyMaterialsChangeMethod => {
    return studyMaterialData && !Array.isArray(studyMaterialData)
      ? "update"
      : "create";
  };

  // TODO: change to return a promise? (likely resolved within createStudyMaterials onSettled)
  const createStudyMaterialsData: ActionCreateFunction = (
    createParams: ActionCreateParams
  ) => {
    const {
      subject,
      userMeaningToUpdate,
      meaningNoteToUpdate,
      readingNoteToUpdate,
    } = createParams;

    const createdStudyMaterialData = constructStudyMaterialData({
      subject_id: subject.id,
      ...(userMeaningToUpdate && { meaning_synonyms: [userMeaningToUpdate] }),
      ...(meaningNoteToUpdate && { meaning_note: meaningNoteToUpdate }),
      ...(readingNoteToUpdate && { reading_note: readingNoteToUpdate }),
    }) as StudyMaterialPostData;

    createStudyMaterials({ studyMaterialsData: createdStudyMaterialData })
      .then((data) => {
        const isMeaningBeingUpdated = userMeaningToUpdate !== undefined;
        updateMeaningsInAssignmentQueue(data, isMeaningBeingUpdated);
      })
      .catch((err) => {
        console.error(
          "Oh no, an error occurred when calling createStudyMaterials!",
          err
        );
      });
  };

  // TODO: change to return a promise? (likely resolved within createStudyMaterials onSettled)
  const updateStudyMaterialsData: ActionUpdateFunction = (
    updateParams: ActionUpdateParams
  ) => {
    const {
      studyMaterialData,
      userMeaningToUpdate,
      meaningNoteToUpdate,
      readingNoteToUpdate,
      actionType,
    } = updateParams;

    // no-op
    if (studyMaterialData === undefined) return;

    const updatedStudyMaterialData = updateValsInStudyMaterialData({
      studyMaterial: studyMaterialData as StudyMaterial,
      ...(userMeaningToUpdate !== undefined && {
        meaningToUpdate: userMeaningToUpdate,
      }),
      ...(meaningNoteToUpdate !== undefined && {
        meaningNoteToUpdate: meaningNoteToUpdate,
      }),
      ...(readingNoteToUpdate !== undefined && {
        readingNoteToUpdate: readingNoteToUpdate,
      }),
      action: actionType,
    });

    updateStudyMaterials({
      studyMaterialID: studyMaterialData.id,
      updatedStudyMaterials: updatedStudyMaterialData,
    })
      .then((data) => {
        const isMeaningBeingUpdated = userMeaningToUpdate !== undefined;
        updateMeaningsInAssignmentQueue(data, isMeaningBeingUpdated);
      })
      .catch((err) => {
        console.error(
          "Oh no, an error occurred when calling updateStudyMaterials!",
          err
        );
      });
  };

  // TODO: type updatedItemData, returned from mutateAsync functions for useCreateStudyMaterials and useUpdateStudyMaterials
  const updateMeaningsInAssignmentQueue = (
    updatedItemData: any,
    isMeaningBeingUpdated: boolean
  ) => {
    if (!isMeaningBeingUpdated || !isSessionInProgress) return;

    const subjectID = updatedItemData.data.subject_id;
    const meaningSynonyms = updatedItemData.data.meaning_synonyms;
    updateQueueItemAltMeanings(subjectID, meaningSynonyms);
  };

  const deleteUserAltSubjectMeaning = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse,
    meaningToDelete: string
  ) => {
    const dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      userMeaningToUpdate: meaningToDelete,
      actionType: "remove",
    });
  };

  const studyMaterialsActionDictionary: ActionDictionary = {
    create: createStudyMaterialsData,
    update: updateStudyMaterialsData,
  };

  const addUserAltSubjectMeaning = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse | undefined,
    userMeaningToUpdate: string
  ) => {
    const dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData: studyMaterialData,
      userMeaningToUpdate,
      actionType: "add",
    });
  };

  const addMeaningNote = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse | undefined,
    meaningNoteToUpdate: string
  ) => {
    const dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      meaningNoteToUpdate,
      actionType: "add",
    });
  };

  const removeMeaningNote = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse | undefined
  ) => {
    // no-op
    if (!studyMaterialData) return;

    const dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      meaningNoteToUpdate: "",
      actionType: "remove",
    });
  };

  const addReadingNote = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse | undefined,
    readingNoteToUpdate: string
  ) => {
    const dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      readingNoteToUpdate,
      actionType: "add",
    });
  };

  const removeReadingNote = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse | undefined
  ) => {
    // no-op
    if (!studyMaterialData) return;

    const dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      readingNoteToUpdate: "",
      actionType: "remove",
    });
  };

  return {
    addUserAltSubjectMeaning,
    deleteUserAltSubjectMeaning,
    addMeaningNote,
    removeMeaningNote,
    addReadingNote,
    removeReadingNote,
  };
};
