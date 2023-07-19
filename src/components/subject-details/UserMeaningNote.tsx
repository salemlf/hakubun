import { useState } from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import NoteIcon from "../../images/note.svg";
import PencilIcon from "../../images/pencil.svg";
import TrashIcon from "../../images/trash.svg";
import SaveIcon from "../../images/save.svg";
import CancelIcon from "../../images/cancel.svg";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";
import styled from "styled-components/macro";
import {
  NoteHintContainer,
  NoteHintHeading,
  IconHeadingContainer,
} from "../styles/BaseStyledComponents";

const NoteContainer = styled(NoteHintContainer)`
  position: relative;
  padding-bottom: 15px;
`;

const NoteIconStyled = styled(IonIcon)`
  margin-right: 5px;
  vertical-align: text-top;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  right: 5px;
  bottom: -16px;
`;

const EditingButton = styled.button`
  padding: 7px;
  border-radius: 50%;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  ion-icon {
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TrashButton = styled(EditingButton)`
  background-color: var(--ion-color-danger-tint);
  color: white;
  margin-right: 15px;
`;

const PencilButton = styled(EditingButton)`
  background-color: var(--ion-color-primary);
  color: white;
`;

const SaveButton = styled(EditingButton)`
  background-color: var(--ion-color-tertiary);
  color: black;
`;

const CancelButton = styled(EditingButton)`
  background-color: var(--ion-color-warning);
  color: black;
  margin-right: 15px;
`;

const Textarea = styled.textarea`
  resize: none;
  width: 100%;
  background-color: var(--light-grey);
`;

type NoteProps = {
  studyMaterialsResponse: StudyMaterialDataResponse;
};

// TODO: on cancel button click -> save without changes
// TODO: on trash button click -> confirm note deletion
const Note = ({ studyMaterialsResponse }: NoteProps) => {
  const [isEditable, setIsEditable] = useState(false);

  const startEditing = () => {
    setIsEditable(true);
  };

  return (
    <NoteContainer>
      <IconHeadingContainer>
        <NoteIconStyled src={NoteIcon} />
        <NoteHintHeading>Meaning Note</NoteHintHeading>
      </IconHeadingContainer>
      {isEditable ? (
        <Textarea
          ref={(ref) => ref && ref.focus()}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          defaultValue={studyMaterialsResponse.meaning_note!}
        ></Textarea>
      ) : (
        <div>{studyMaterialsResponse.meaning_note}</div>
      )}

      <ButtonContainer>
        {isEditable ? (
          <>
            <CancelButton aria-label="Cancel">
              <IonIcon src={CancelIcon} />
            </CancelButton>
            <SaveButton aria-label="Save">
              <IonIcon src={SaveIcon} onClick={() => setIsEditable(false)} />
            </SaveButton>
          </>
        ) : (
          <>
            <TrashButton aria-label="Delete">
              <IonIcon src={TrashIcon} />
            </TrashButton>
            <PencilButton onClick={() => startEditing()} aria-label="Edit">
              <IonIcon src={PencilIcon} />
            </PencilButton>
          </>
        )}
      </ButtonContainer>
    </NoteContainer>
  );
};

type Props = {
  subject: Subject;
};

export const UserMeaningNote = ({ subject }: Props) => {
  const {
    isLoading: studyMaterialLoading,
    data: studyMaterialData,
    error: studyMaterialErr,
  } = useStudyMaterialsBySubjIDs([subject.id]);

  return (
    <>
      {!studyMaterialLoading ? (
        <>
          {studyMaterialData && studyMaterialData.meaning_note ? (
            <Note studyMaterialsResponse={studyMaterialData} />
          ) : (
            <p>Button to add goes here</p>
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
