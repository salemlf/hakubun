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
import { updateMeaningSynonymsInStudyMaterial } from "../../services/MiscService";

type Props = {
  subject: Subject;
};

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

export const AddUserMeaningButton = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const { mutate: updateStudyMaterials } = useUpdateStudyMaterials();

  const addUserMeaning = (userMeaningToAdd: string) => {
    console.log(
      "🚀 ~ file: AddUserMeaningButton.tsx:102 ~ addUserMeaning ~ studyMaterialData:",
      studyMaterialData
    );
    if (studyMaterialData) {
      //
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
      // TODO: data already exists, call updateStudyMaterialsMutation (do put request using study materials ID)

      updateStudyMaterials({
        studyMaterialID: studyMaterialData.id,
        updatedStudyMaterials: updatedMaterialsWithAddedMeaning,
      });
    } else {
      // TODO: data doesn't exist, call constructStudyMaterialData and then separate function to put data (do post using subject id to create)
      console.log("NOT IMPLEMENTED - Need to construct data");
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
