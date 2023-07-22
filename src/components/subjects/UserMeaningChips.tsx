import { Fragment } from "react";
import { IonIcon, IonSkeletonText, useIonAlert } from "@ionic/react";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";
import { generateUUID } from "../../services/MiscService";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";
import { Chip } from "../styles/BaseStyledComponents";
import { closeCircle } from "ionicons/icons";

type MeaningWithUUID = {
  meaning: string;
  uuid: string;
};

type ChipProps = {
  subject: Subject;
  studyMaterialsResponse: StudyMaterialDataResponse;
  userMeaningsWithUUIDs: MeaningWithUUID[];
};

const Chips = ({
  subject,
  studyMaterialsResponse,
  userMeaningsWithUUIDs,
}: ChipProps) => {
  const { deleteUserAltSubjectMeaning } = useStudyMaterialsChange();
  const [presentAlert] = useIonAlert();

  const deleteMeaningAlert = (meaningWithUUID: MeaningWithUUID) => {
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
              subject,
              studyMaterialsResponse,
              meaningToDelete
            );
          },
        },
      ],
    });
  };

  return (
    <>
      {userMeaningsWithUUIDs.map((meaningWithUUID: MeaningWithUUID) => {
        return (
          <Fragment key={meaningWithUUID.uuid}>
            <Chip
              onClick={(e: any) => {
                deleteMeaningAlert(meaningWithUUID);
              }}
            >
              {meaningWithUUID.meaning}
              <IonIcon icon={closeCircle}></IonIcon>
            </Chip>
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
              subject={subject}
              studyMaterialsResponse={studyMaterialData}
              userMeaningsWithUUIDs={createUserMeaningKeys(studyMaterialData)}
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
