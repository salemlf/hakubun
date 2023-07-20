import { Fragment, useState } from "react";
import {
  IonChip,
  IonLabel,
  IonIcon,
  IonSkeletonText,
  IonAlert,
} from "@ionic/react";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useStudyMaterialsChange } from "../../hooks/misc/useStudyMaterialsChange";
import { generateUUID } from "../../services/MiscService";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";

import { closeCircle } from "ionicons/icons";
import styled from "styled-components/macro";

const Alert = styled(IonAlert)`
  @media (prefers-color-scheme: dark) {
    .alert-message {
      color: white;
    }
  }
`;

type UserMeaningsWithKeys = {
  meaning: string;
  uuid: string;
};

type ChipProps = {
  studyMaterialsResponse: StudyMaterialDataResponse;
  userMeaningsWithKeys: UserMeaningsWithKeys[];
};

const Chips = ({ studyMaterialsResponse, userMeaningsWithKeys }: ChipProps) => {
  const [selectedMeaning, setSelectedMeaning] = useState("");

  const { deleteUserAltSubjectMeaning } = useStudyMaterialsChange();

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
                setSelectedMeaning(meaningWithUUID.meaning);
              }}
              id={`present-${meaningWithUUID.uuid}`}
            >
              <IonLabel>{meaningWithUUID.meaning}</IonLabel>
              <IonIcon icon={closeCircle}></IonIcon>
            </IonChip>
            <Alert
              header="Delete Meaning"
              trigger={`present-${meaningWithUUID.uuid}`}
              message={`Delete user meaning ${meaningWithUUID.meaning}?`}
              buttons={[
                {
                  text: "Cancel",
                  role: "cancel",
                },
                {
                  text: "Delete",
                  role: "destructive",
                  handler: () => {
                    deleteUserAltSubjectMeaning(
                      studyMaterialsResponse,
                      selectedMeaning
                    );
                  },
                },
              ]}
              onDidDismiss={({ detail }) => {
                // *testing
                console.log(
                  "🚀 ~ file: UserMeaningChips.tsx:119 ~ detail:",
                  detail
                );
                // *testing
              }}
            ></Alert>
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
