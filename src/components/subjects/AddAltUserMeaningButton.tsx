import { IonIcon, IonLabel, IonSkeletonText } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";

import { AddChip, Alert } from "../styles/BaseStyledComponents";

type Props = {
  subject: Subject;
};

export const AddAltUserMeaningButton = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);
  const { addUserAltSubjectMeaning } = useStudyMaterialsChange();

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

                  // TODO: don't let user submit empty input

                  let addedMeaning = alertData.meaning;
                  addUserAltSubjectMeaning(
                    subject,
                    studyMaterialData,
                    addedMeaning
                  );
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
            onDidDismiss={({ detail }) => {
              // TODO: clear input
            }}
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
