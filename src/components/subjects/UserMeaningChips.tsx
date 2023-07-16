import { IonChip, IonLabel, IonIcon, IonSkeletonText } from "@ionic/react";
import { closeCircle } from "ionicons/icons";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { nanoid } from "nanoid";
import { StudyMaterial } from "../../types/MiscTypes";

import styled from "styled-components/macro";

type ChipProps = {
  studyMaterials: StudyMaterial;
};

// TODO: allow click
// TODO: onclick, make dialog show confirming delete of synonym
const Chips = ({ studyMaterials }: ChipProps) => {
  // *testing
  console.log(
    "🚀 ~ file: UserMeaningChips.tsx:11 ~ Chips ~ studyMaterials:",
    studyMaterials
  );
  // *testing

  let userMeanings = studyMaterials.meaning_synonyms;
  return (
    <>
      {userMeanings.map((meaning: string) => {
        return (
          <IonChip key={`meaning-chip-${nanoid()}`}>
            <IonLabel>{meaning}</IonLabel>
            <IonIcon icon={closeCircle}></IonIcon>
          </IonChip>
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
