import {
  IonIcon,
  IonLabel,
  IonSkeletonText,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { addOutline } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";

import { AddChip } from "../styles/BaseStyledComponents";

type Props = {
  subject: Subject;
};

// TODO: make click event trigger on enter OR just turn into a button (the name lies)
export const AddAltUserMeaningButton = ({ subject }: Props) => {
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
          <AddChip
            tabIndex={0}
            id="present-user-meaning-add"
            onClick={(e: any) => {
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
            <IonLabel>Add</IonLabel>
            <IonIcon icon={addOutline}></IonIcon>
          </AddChip>
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
