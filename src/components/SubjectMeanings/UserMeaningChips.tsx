import { Fragment } from "react";
import { IonIcon, IonSkeletonText, useIonAlert } from "@ionic/react";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/useStudyMaterialsChange";
import { generateUUID } from "../../utils";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";
import { Chip } from "../../styles/BaseStyledComponents";
import { closeCircle } from "ionicons/icons";
import styled from "styled-components/macro";

const UserMeaningChip = styled(Chip)`
  background-color: var(--light-greyish-purple);
`;

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
            <UserMeaningChip
              onClick={(e: any) => {
                deleteMeaningAlert(meaningWithUUID);
              }}
            >
              {meaningWithUUID.meaning}
              <IonIcon icon={closeCircle}></IonIcon>
            </UserMeaningChip>
          </Fragment>
        );
      })}
    </>
  );
};

type Props = {
  subject: Subject;
};

function UserMeaningChips({ subject }: Props) {
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
}

export default UserMeaningChips;
