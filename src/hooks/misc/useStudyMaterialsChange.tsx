import { useCreateStudyMaterials } from "./useCreateStudyMaterials";
import { useUpdateStudyMaterials } from "./useUpdateStudyMaterials";
import {
  StudyMaterialDataResponse,
  StudyMaterialPostData,
} from "../../types/MiscTypes";
import {
  constructStudyMaterialData,
  updateMeaningSynonymsInStudyMaterial,
} from "../../services/MiscService";
import { Subject } from "../../types/Subject";

type StudyMaterialsChangeMethod = "create" | "update";

type ActionDictionary = {
  [key in StudyMaterialsChangeMethod]: ActionFunction;
};

interface ActionParams {
  subject: Subject;
  studyMaterialData: StudyMaterialDataResponse;
  userMeaningToAdd: string;
}

type ActionFunction = (params: ActionParams) => void;

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

  const createStudyMaterialsData: ActionFunction = (
    createParams: ActionParams
  ) => {
    let { subject, userMeaningToAdd } = createParams;

    let createdStudyMaterialData = constructStudyMaterialData({
      subject_id: subject.id,
      meaning_synonyms: [userMeaningToAdd],
    }) as StudyMaterialPostData;
    console.log(
      "🚀 ~ file: AddUserMeaningButton.tsx:78 ~ addUserMeaning ~ createdStudyMaterialData:",
      createdStudyMaterialData
    );

    createStudyMaterials({ studyMaterialsData: createdStudyMaterialData });
  };

  const updateStudyMaterialsData: ActionFunction = (
    updateParams: ActionParams
  ) => {
    let { studyMaterialData, userMeaningToAdd } = updateParams;

    let updatedMaterialsWithAddedMeaning = updateMeaningSynonymsInStudyMaterial(
      studyMaterialData,
      userMeaningToAdd,
      "add"
    );

    updateStudyMaterials({
      studyMaterialID: studyMaterialData.id,
      updatedStudyMaterials: updatedMaterialsWithAddedMeaning,
    });
  };

  const studyMaterialsActionDictionary: ActionDictionary = {
    create: createStudyMaterialsData,
    update: updateStudyMaterialsData,
  };

  const addUserAltSubjectMeaning = (
    subject: Subject,
    studyMaterialData: StudyMaterialDataResponse,
    userMeaningToAdd: string
  ) => {
    let dataChangeMethod: StudyMaterialsChangeMethod =
      getDataChangeMethod(studyMaterialData);

    studyMaterialsActionDictionary[dataChangeMethod]({
      subject,
      studyMaterialData,
      userMeaningToAdd,
    });
  };

  return {
    addUserAltSubjectMeaning,
  };
};
