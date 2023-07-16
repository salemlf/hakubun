import {
  IonChip,
  IonLabel,
  IonIcon,
  IonSkeletonText,
  IonAlert,
} from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { StudyMaterial } from "../../types/MiscTypes";

import styled from "styled-components/macro";
import { useState } from "react";
import { generateUUID } from "../../services/MiscService";

type ChipProps = {
  studyMaterials: StudyMaterial;
};

const Alert = styled(IonAlert)`
  @media (prefers-color-scheme: dark) {
    .alert-message {
      color: white;
    }
  }
`;

// TODO: check that uuids are being generated properly, getting warning that key props aren't unique
const Chips = ({ studyMaterials }: ChipProps) => {
  const [selectedMeaning, setSelectedMeaning] = useState("");
  // *testing
  console.log(
    "🚀 ~ file: UserMeaningChips.tsx:11 ~ Chips ~ studyMaterials:",
    studyMaterials
  );
  // *testing

  // TODO: use updateMeaningSynonymsInStudyMaterial to filter out meaning from userMeanings, will then be used in PUT request

  let userMeanings = studyMaterials.meaning_synonyms;
  console.log(
    "🚀 ~ file: UserMeaningChips.tsx:42 ~ Chips ~ userMeanings:",
    userMeanings
  );

  let userMeaningsWithUUIDs = userMeanings.map((meaning) => ({
    meaning,
    uuid: generateUUID(),
  }));
  // *testing
  console.log(
    "🚀 ~ file: UserMeaningChips.tsx:44 ~ Chips ~ userMeaningsWithUUIDs:",
    userMeaningsWithUUIDs
  );
  // *testing
  type MeaningWithUUID = {
    meaning: string;
    uuid: string;
  };

  return (
    <>
      {userMeaningsWithUUIDs.map((meaningWithUUID: MeaningWithUUID) => {
        return (
          <>
            <IonChip
              onClick={(e: any) => {
                setSelectedMeaning(meaningWithUUID.meaning);
              }}
              id={`present-${meaningWithUUID.uuid}`}
              key={meaningWithUUID.uuid}
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
                  handler: () => {
                    // *testing
                    console.log("Canceled deletion");
                    // *testing
                  },
                },
                {
                  text: "Delete",
                  role: "destructive",
                  handler: () => {
                    // *testing
                    console.log("Deleting meaning...");
                    // *testing
                    // TODO: call function to filter out and delete meaning
                  },
                },
              ]}
              onDidDismiss={({ detail }) => {
                console.log(
                  "🚀 ~ file: UserMeaningChips.tsx:119 ~ detail:",
                  detail
                );
              }}
            ></Alert>
          </>
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

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {studyMaterialData && studyMaterialData.meaning_synonyms && (
            <Chips studyMaterials={studyMaterialData} />
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
