import { Fragment, useState } from "react";
import {
  IonChip,
  IonLabel,
  IonIcon,
  IonSkeletonText,
  IonAlert,
} from "@ionic/react";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { useUpdateStudyMaterials } from "../../hooks/misc/useUpdateStudyMaterials";
import { updateMeaningSynonymsInStudyMaterial } from "../../services/MiscService";
import { generateUUID } from "../../services/MiscService";
import { Subject } from "../../types/Subject";
import {
  StudyMaterial,
  StudyMaterialDataResponse,
} from "../../types/MiscTypes";

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

// TODO: check that uuids are being generated properly, getting warning that key props aren't unique
const Chips = ({ studyMaterialsResponse, userMeaningsWithKeys }: ChipProps) => {
  const [selectedMeaning, setSelectedMeaning] = useState("");
  const { mutate: updateStudyMaterials } = useUpdateStudyMaterials();

  // TODO: do this in UserMeaningChips component, then pass data?
  // let userMeaningsWithUUIDs = studyMaterialsResponse.meaning_synonyms.map(
  //   (meaning: any) => ({
  //     meaning,
  //     uuid: generateUUID(),
  //   })
  // );
  // *testing
  console.log(
    "🚀 ~ file: UserMeaningChips.tsx:44 ~ Chips ~ userMeaningsWithKeys:",
    userMeaningsWithKeys
  );
  // *testing

  type MeaningWithUUID = {
    meaning: string;
    uuid: string;
  };

  const deleteUserMeaning = () => {
    let updatedMaterialsWithRemovedMeaning =
      updateMeaningSynonymsInStudyMaterial(
        studyMaterialsResponse as StudyMaterial,
        selectedMeaning,
        "remove"
      );

    updateStudyMaterials({
      studyMaterialID: studyMaterialsResponse.id,
      updatedStudyMaterials: updatedMaterialsWithRemovedMeaning,
    });
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
                    // *testing
                    console.log("Deleting meaning...");
                    // *testing
                    deleteUserMeaning();
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
