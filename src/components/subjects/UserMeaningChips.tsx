import { Fragment } from "react";
import {
  IonChip,
  IonLabel,
  IonIcon,
  IonSkeletonText,
  useIonAlert,
} from "@ionic/react";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";
import { generateUUID } from "../../services/MiscService";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";

import { closeCircle } from "ionicons/icons";

type UserMeaningsWithKeys = {
  meaning: string;
  uuid: string;
};

type ChipProps = {
  studyMaterialsResponse: StudyMaterialDataResponse;
  userMeaningsWithKeys: UserMeaningsWithKeys[];
};

const Chips = ({ studyMaterialsResponse, userMeaningsWithKeys }: ChipProps) => {
  const { deleteUserAltSubjectMeaning } = useStudyMaterialsChange();
  const [presentAlert] = useIonAlert();

  type MeaningWithUUID = {
    meaning: string;
    uuid: string;
  };

  return (
    <>
      {userMeaningsWithKeys.map((meaningWithUUID: MeaningWithUUID) => {
        return (
          <Fragment key={meaningWithUUID.uuid}>
            <IonChip
              onClick={(e: any) => {
                presentAlert({
                  header: "Delete Meaning",
                  message: `Delete user meaning ${meaningWithUUID.meaning}?`,
                  cssClass: "custom-alert",
                  buttons: [
                    {
                      text: "Cancel",
                      role: "cancel",
                    },
                    {
                      text: "Delete",
                      role: "destructive",
                      handler: () => {
                        let meaningToDelete = meaningWithUUID.meaning;
                        deleteUserAltSubjectMeaning(
                          studyMaterialsResponse,
                          meaningToDelete
                        );
                      },
                    },
                  ],
                });
              }}
            >
              <IonLabel>{meaningWithUUID.meaning}</IonLabel>
              <IonIcon icon={closeCircle}></IonIcon>
            </IonChip>
          </Fragment>
        );
      })}
    </>
  );
};

type Props = {
  subject: Subject;
};

export const UserMeaningChips = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const createUserMeaningKeys = (
    studyMaterialsResponse: StudyMaterialDataResponse
  ) => {
    return studyMaterialsResponse.meaning_synonyms.map((meaning: any) => ({
      meaning,
      uuid: generateUUID(),
    }));
  };

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {studyMaterialData && studyMaterialData.meaning_synonyms && (
            <Chips
              studyMaterialsResponse={studyMaterialData}
              userMeaningsWithKeys={createUserMeaningKeys(studyMaterialData)}
            />
          )}
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
