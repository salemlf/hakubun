import { useCreateStudyMaterials } from "./useCreateStudyMaterials";
import { useUpdateStudyMaterials } from "./useUpdateStudyMaterials";
import {
  StudyMaterial,
  StudyMaterialDataResponse,
  StudyMaterialPostData,
  StudyMaterialsChangeActionType,
} from "../../types/MiscTypes";
import {
  constructStudyMaterialData,
  updateValsInStudyMaterialData,
} from "../../services/MiscService";
import { Subject } from "../../types/Subject";

type StudyMaterialsChangeMethod = "create" | "update";

type ActionDictionary = {
  [key in StudyMaterialsChangeMethod]:
    | ActionUpdateFunction
    | ActionCreateFunction;
};

// TODO: create type definition that makes at least one of optional params required
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
  const { mutate: createStudyMaterials } = useCreateStudyMaterials();
  const { mutate: updateStudyMaterials } = useUpdateStudyMaterials();

  const getDataChangeMethod = (
    studyMaterialData: StudyMaterialDataResponse
  ): StudyMaterialsChangeMethod => {
    return studyMaterialData && !Array.isArray(studyMaterialData)
      ? "update"
      : "create";
  };

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

    console.log(
      "🚀 ~ file: useStudyMaterialsChange.tsx:54 ~ createdStudyMaterialData:",
      createdStudyMaterialData
    );

    createStudyMaterials({ studyMaterialsData: createdStudyMaterialData });
  };

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

    // *testing
    console.log(
      "🚀 ~ file: useStudyMaterialsChange.tsx:69 ~ useStudyMaterialsChange ~ updatedStudyMaterialData:",
      updatedStudyMaterialData
    );
    // *testing

    updateStudyMaterials({
      studyMaterialID: studyMaterialData.id,
      updatedStudyMaterials: updatedStudyMaterialData,
    });
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

  return {
    addUserAltSubjectMeaning,
    deleteUserAltSubjectMeaning,
    addMeaningNote,
    removeMeaningNote,
  };
};
