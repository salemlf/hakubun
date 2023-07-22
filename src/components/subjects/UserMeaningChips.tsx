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

import styled from "styled-components/macro";
import { closeCircle } from "ionicons/icons";

const Chip = styled(IonChip)`
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus {
    outline: 4px solid var(--ion-color-tertiary);
    --outline: 4px solid var(--ion-color-tertiary);
  }
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

// TODO: make click event trigger on enter OR just turn into a button
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
              tabIndex={0}
              onClick={(e: any) => {
                deleteMeaningAlert(meaningWithUUID);
              }}
            >
              <IonLabel>{meaningWithUUID.meaning}</IonLabel>
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
