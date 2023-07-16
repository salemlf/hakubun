import { IonAlert, IonButton, IonChip, IonIcon, IonLabel } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import styled from "styled-components/macro";

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

  return (
    <>
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
            handler: () => {
              // *testing
              console.log("Adding meaning...");
              // *testing
              // TODO: call function to add meaning
            },
          },
        ]}
        inputs={[
          {
            label: "Meaning",
            type: "textarea",
            attributes: {
              maxlength: 100,
            },
          },
        ]}
      ></Alert>
    </>
  );
};
