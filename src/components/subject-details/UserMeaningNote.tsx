import { useState } from "react";
import { IonIcon, IonLabel, IonSkeletonText } from "@ionic/react";
import { Note } from "./Note";
import { Subject } from "../../types/Subject";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";

import styled from "styled-components/macro";
import { AddChip } from "../styles/BaseStyledComponents";
import { addOutline } from "ionicons/icons";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 3px;
`;

type Props = {
  subject: Subject;
};

// TODO: make a generic version of this component so can be used for user reading note also
export const UserMeaningNote = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  const [editingInProgress, setEditingInProgress] = useState(false);

  // *testing
  console.log(
    "🚀 ~ file: UserMeaningNote.tsx:178 ~ UserMeaningNote ~ studyMaterialData:",
    studyMaterialData
  );
  // *testing

  const meaningNoteNotEmpty = (
    studyMaterialData: StudyMaterialDataResponse
  ) => {
    return (
      studyMaterialData &&
      !Array.isArray(studyMaterialData) &&
      studyMaterialData.meaning_note !== null &&
      studyMaterialData.meaning_note !== ""
    );
  };

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {meaningNoteNotEmpty(studyMaterialData) || editingInProgress ? (
            <Note
              subject={subject}
              studyMaterial={studyMaterialData}
              meaningNote={studyMaterialData.meaning_note}
              beganEditing={editingInProgress}
              setEditingInProgress={(isEditing: boolean) =>
                setEditingInProgress(isEditing)
              }
            />
          ) : (
            <AddButtonContainer>
              <AddChip
                tabIndex={0}
                id="present-user-meaning-note-add"
                onClick={(e: any) => {
                  console.log("ADD USER MEANING CLICKED! ");
                  setEditingInProgress(true);
                }}
              >
                <IonLabel>Add Meaning Note</IonLabel>
                <IonIcon icon={addOutline}></IonIcon>
              </AddChip>
            </AddButtonContainer>
          )}
        </>
      ) : (
        <IonSkeletonText
          animated={true}
          style={{ height: "30px" }}
        ></IonSkeletonText>
      )}
    </>
  );
};
