import {
  IonIcon,
  IonSkeletonText,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/useStudyMaterialsChange";
import { Chip } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const AddButton = styled(Chip)`
  background-color: var(--ion-color-secondary);
  font-size: 0.9rem;
`;

type Props = {
  subject: Subject;
};

// TODO: modify to use custom dialog and custom toast
function AddAltUserMeaningButton({ subject }: Props) {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);
  const { addUserAltSubjectMeaning } = useStudyMaterialsChange();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          <AddButton
            aria-label="Add alternative meaning"
            id="present-user-meaning-add"
            onPress={(e: any) => {
              presentAlert({
                header: "Add Meaning",
                cssClass: "custom-alert",
                buttons: [
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
                      let addedMeaning = alertData.meaning;
                      // *testing
                      console.log(
                        "🚀 ~ file: AddAltUserMeaningButton.tsx:58 ~ AddAltUserMeaningButton ~ addedMeaning:",
                        addedMeaning
                      );
                      // *testing

                      // TODO: add an icon to warning toast
                      if (addedMeaning === "") {
                        presentToast({
                          message: "No meaning entered",
                          duration: 3000,
                          position: "bottom",
                          cssClass: ["custom-toast", "warning-toast"],
                          buttons: [
                            {
                              text: "Dismiss",
                              role: "cancel",
                            },
                          ],
                        });
                      } else {
                        addUserAltSubjectMeaning(
                          subject,
                          studyMaterialData,
                          addedMeaning
                        );
                      }
                    },
                  },
                ],
                inputs: [
                  {
                    name: "meaning",
                    label: "Meaning",
                    type: "textarea",
                    attributes: {
                      minlength: 1,
                    },
                  },
                ],
              });
            }}
          >
            Add
            <IonIcon icon={addOutline}></IonIcon>
          </AddButton>
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "20px" }}
        ></IonSkeletonText>
      )}
    </>
  );
}

export default AddAltUserMeaningButton;
