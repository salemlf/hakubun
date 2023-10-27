import {
  constructStudyMaterialData,
  updateValsInStudyMaterialData,
} from "../services/MiscService";
import { useAssignmentQueueStore } from "../stores/useAssignmentQueueStore";
import { useCreateStudyMaterials } from "./useCreateStudyMaterials";
import { useUpdateStudyMaterials } from "./useUpdateStudyMaterials";
import {
  StudyMaterial,
  StudyMaterialDataResponse,
  StudyMaterialPostData,
  StudyMaterialsChangeActionType,
} from "../types/MiscTypes";
import { Subject } from "../types/Subject";

type StudyMaterialsChangeMethod = "create" | "update";

type ActionDictionary = {
  [key in StudyMaterialsChangeMethod]:
    | ActionUpdateFunction
    | ActionCreateFunction;
};

// TODO: use RequireAtLeastOne to make at least one of optional params required
interface ActionParams {
  subject?: Subject;
  studyMaterialData: StudyMaterialDataResponse;
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
    studyMaterialData: StudyMaterialDataResponse
  ): StudyMaterialsChangeMethod => {
    return studyMaterialData && !Array.isArray(studyMaterialData)
      ? "update"
      : "create";
  };

  // TODO: change to return a promise? (likely resolved within createStudyMaterials onSettled)
  const createStudyMaterialsData: ActionCreateFunction = (
    createParams: ActionCreateParams
  ) => {
    let {
      subject,
      userMeaningToUpdate,
      meaningNoteToUpdate,
      readingNoteToUpdate,
    } = createParams;

    let createdStudyMaterialData = constructStudyMaterialData({
      subject_id: subject.id,
      ...(userMeaningToUpdate && { meaning_synonyms: [userMeaningToUpdate] }),
      ...(meaningNoteToUpdate && { meaning_note: meaningNoteToUpdate }),
      ...(readingNoteToUpdate && { reading_note: readingNoteToUpdate }),
    }) as StudyMaterialPostData;

    createStudyMaterials({ studyMaterialsData: createdStudyMaterialData })
      .then((data) => {
        let isMeaningBeingUpdated = userMeaningToUpdate !== undefined;
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
    let {
      studyMaterialData,
      userMeaningToUpdate,
      meaningNoteToUpdate,
      readingNoteToUpdate,
      actionType,
    } = updateParams;

    let updatedStudyMaterialData = updateValsInStudyMaterialData({
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
        let isMeaningBeingUpdated = userMeaningToUpdate !== undefined;
        updateMeaningsInAssignmentQueue(data, isMeaningBeingUpdated);
      })
      .catch((err) => {
        console.error(
          "Oh no, an error occurred when calling updateStudyMaterials!",
          err
        );
      });
  };

  const updateMeaningsInAssignmentQueue = (
    updatedItemData: any,
    isMeaningBeingUpdated: boolean
  ) => {
    if (!isMeaningBeingUpdated || !isSessionInProgress) return;

    let subjectID = updatedItemData.data.subject_id;
    let meaningSynonyms = updatedItemData.data.meaning_synonyms;
    updateQueueItemAltMeanings(subjectID, meaningSynonyms);
  };

  const deleteUserAltSubjectMeaning = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse,
    meaningToDelete: string
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
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
    studyMaterialData: StudyMaterialDataResponse,
    userMeaningToUpdate: string
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      userMeaningToUpdate,
      actionType: "add",
    });
  };

  const addMeaningNote = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse,
    meaningNoteToUpdate: string
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
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
    studyMaterialData: StudyMaterialDataResponse
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
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
    studyMaterialData: StudyMaterialDataResponse,
    readingNoteToUpdate: string
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
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
    studyMaterialData: StudyMaterialDataResponse
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
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
