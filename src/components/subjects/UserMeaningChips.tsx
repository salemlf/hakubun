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
import { nanoid } from "nanoid";
import { StudyMaterial } from "../../types/MiscTypes";

import styled from "styled-components/macro";
import { useState } from "react";

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

const Chips = ({ studyMaterials }: ChipProps) => {
  const [selectedMeaning, setSelectedMeaning] = useState("");
  // *testing
  console.log(
    "🚀 ~ file: UserMeaningChips.tsx:11 ~ Chips ~ studyMaterials:",
    studyMaterials
  );
  // *testing

  //   TODO: create function to filter out meaning from userMeanings, will then be used in PUT request

  let userMeanings = studyMaterials.meaning_synonyms;
  return (
    <>
      {userMeanings.map((meaning: string) => {
        let currChipID = nanoid();
        return (
          <>
            <IonChip
              onClick={(e: any) => {
                setSelectedMeaning(meaning);
              }}
              id={`present-${currChipID}`}
              key={`meaning-chip-${currChipID}`}
            >
              <IonLabel>{meaning}</IonLabel>
              <IonIcon icon={closeCircle}></IonIcon>
            </IonChip>
            <Alert
              header="Delete Meaning"
              trigger={`present-${currChipID}`}
              message={`Delete user meaning ${meaning}?`}
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
        <>{studyMaterialData && <Chips studyMaterials={studyMaterialData} />}</>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "20px" }}
        ></IonSkeletonText>
      )}
    </>
  );
};
