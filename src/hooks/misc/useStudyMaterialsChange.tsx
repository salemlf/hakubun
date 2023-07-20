import { useCreateStudyMaterials } from "./useCreateStudyMaterials";
import { useUpdateStudyMaterials } from "./useUpdateStudyMaterials";
import {
  StudyMaterial,
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

    createStudyMaterials({ studyMaterialsData: createdStudyMaterialData });
  };

  // TODO: modify to make this more generic (can update more than just alt meanings)
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

  //   TODO: change so this is a generic delete function, not just for alt subject meaning
  const deleteUserAltSubjectMeaning = (
    studyMaterialsResponse: StudyMaterialDataResponse,
    meaningToDelete: string
  ) => {
    let updatedMaterialsWithRemovedMeaning =
      updateMeaningSynonymsInStudyMaterial(
        studyMaterialsResponse as StudyMaterial,
        meaningToDelete,
        "remove"
      );

    updateStudyMaterials({
      studyMaterialID: studyMaterialsResponse.id,
      updatedStudyMaterials: updatedMaterialsWithRemovedMeaning,
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
    deleteUserAltSubjectMeaning,
  };
};
