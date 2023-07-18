import { useState } from "react";
import { IonIcon, IonSkeletonText } from "@ionic/react";
import NoteIcon from "../../images/note.svg";
import PencilIcon from "../../images/pencil.svg";
import { Subject } from "../../types/Subject";
import { useStudyMaterialsBySubjIDs } from "../../hooks/useStudyMaterialsBySubjIDs";
import { StudyMaterialDataResponse } from "../../types/MiscTypes";
import styled from "styled-components/macro";
import {
  NoteHintContainer,
  NoteHintHeading,
  IconHeadingContainer,
} from "../styles/BaseStyledComponents";

const NoteIconStyled = styled(IonIcon)`
  margin-right: 5px;
  vertical-align: text-top;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EditingButton = styled.button`
  padding: 5px;
  border-radius: 50%;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);

  ion-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const PencilButton = styled(EditingButton)`
  background-color: var(--ion-color-primary);
  color: black;
`;

type NoteProps = {
  studyMaterialsResponse: StudyMaterialDataResponse;
};

const Note = ({ studyMaterialsResponse }: NoteProps) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <NoteHintContainer>
      <IconHeadingContainer>
        <NoteIconStyled src={NoteIcon} />
        <NoteHintHeading>Meaning Note</NoteHintHeading>
      </IconHeadingContainer>
      <div contentEditable={isEditable}>
        {studyMaterialsResponse.meaning_note}
      </div>
      <ButtonContainer>
        <PencilButton>
          <IonIcon src={PencilIcon} />
        </PencilButton>
      </ButtonContainer>
    </NoteHintContainer>
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
