import {
  IonAlert,
  IonChip,
  IonIcon,
  IonLabel,
  IonSkeletonText,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import styled from "styled-components/macro";
import { useUpdateStudyMaterials } from "../../hooks/misc/useUpdateStudyMaterials";
import { useCreateStudyMaterials } from "../../hooks/misc/useCreateStudyMaterials";
import {
  constructStudyMaterialData,
  updateMeaningSynonymsInStudyMaterial,
} from "../../services/MiscService";
import { StudyMaterialPostData } from "../../types/MiscTypes";

const AddChip = styled(IonChip)`
  --background: #6930c3;
  --color: white;

  ion-icon {
    color: white;
  }
`;

const Alert = styled(IonAlert)`
  @media (prefers-color-scheme: dark) {
    .alert-message {
      color: white;
    }
  }
`;

type Props = {
  subject: Subject;
};

export const AddUserMeaningButton = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const { mutate: updateStudyMaterials } = useUpdateStudyMaterials();
  const { mutate: createStudyMaterials } = useCreateStudyMaterials();

  const addUserMeaning = (userMeaningToAdd: string) => {
    // *testing
    console.log(
      "🚀 ~ file: AddUserMeaningButton.tsx:102 ~ addUserMeaning ~ studyMaterialData:",
      studyMaterialData
    );
    // *testing

    if (studyMaterialData && !Array.isArray(studyMaterialData)) {
      let updatedMaterialsWithAddedMeaning =
        updateMeaningSynonymsInStudyMaterial(
          studyMaterialData,
          userMeaningToAdd,
          "add"
        );
      // *testing
      console.log(
        "🚀 ~ file: AddUserMeaningButton.tsx:107 ~ addUserMeaning ~ updatedMaterialsWithAddedMeaning:",
        updatedMaterialsWithAddedMeaning
      );
      // *testing

      updateStudyMaterials({
        studyMaterialID: studyMaterialData.id,
        updatedStudyMaterials: updatedMaterialsWithAddedMeaning,
      });
    } else {
      let createdStudyMaterialData = constructStudyMaterialData({
        subject_id: subject.id,
        meaning_synonyms: [userMeaningToAdd],
      }) as StudyMaterialPostData;
      console.log(
        "🚀 ~ file: AddUserMeaningButton.tsx:78 ~ addUserMeaning ~ createdStudyMaterialData:",
        createdStudyMaterialData
      );
      // TODO: data doesn't exist, call constructStudyMaterialData and then do post using subject id to create
      // console.log("NOT IMPLEMENTED - Need to construct data");
      createStudyMaterials({ studyMaterialsData: createdStudyMaterialData });
    }
  };

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {" "}
          <AddChip
            id="present-user-meaning-add"
            onClick={(e: any) => {
              console.log("ADD ITEM CLICKED! ");
            }}
          >
            <IonLabel>Add</IonLabel>
            <IonIcon icon={addOutline}></IonIcon>
          </AddChip>
          <Alert
            trigger="present-user-meaning-add"
            header="Add Meaning"
            buttons={[
              {
                text: "Cancel",
                role: "cancel",
                handler: () => {
                  // *testing
                  console.log("Canceled user meaning add");
                  // *testing
                },
              },
              {
                text: "Add",
                role: "add",
                handler: (alertData) => {
                  // *testing
                  console.log(
                    "🚀 ~ file: AddUserMeaningButton.tsx:85 ~ AddUserMeaningButton ~ alertData:",
                    alertData
                  );
                  console.log("Adding meaning...");
                  // *testing
                  // TODO: call function to add meaning
                  addUserMeaning(alertData.meaning);
                },
              },
            ]}
            inputs={[
              {
                name: "meaning",
                label: "Meaning",
                type: "textarea",
                attributes: {
                  maxlength: 100,
                },
              },
            ]}
          ></Alert>
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "20px" }}
        ></IonSkeletonText>
      )}
    </>
  );
};
