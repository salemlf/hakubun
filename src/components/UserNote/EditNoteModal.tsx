import { useEffect, useRef } from "react";
import { capitalizeWord } from "../../services/MiscService/MiscService";
import { displayToast } from "../Toast/Toast.service";
import { UserNoteType } from "../../types/MiscTypes";
import Modal from "../Modal";
import Button from "../Button";
import ReadingIcon from "../../images/reading.svg?react";
import MeaningIcon from "../../images/meaning.svg?react";
import styled from "styled-components";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 10px;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 2px solid black;
  border-radius: 16px;
  font-size: 0.9rem;
  color: white;

  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;

  &:focus-visible {
    outline: 2px solid white;
    --outline: 2px solid white;
  }
`;

const UserNoteForm = styled.form``;

const Fieldset = styled.fieldset`
  all: unset;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const NoteTextArea = styled.textarea`
  width: 100%;
  display: inline-flex;
  color: black;
  background-color: white;
  flex: 1;

  &::selection {
    background-color: var(--ion-color-primary);
    color: black;
  }

  &::-moz-selection {
    background-color: var(--ion-color-primary);
    color: black;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled(Button)`
  padding: 10px;
  border-radius: 12px;
  border: 1px solid black;
  font-size: 1.25rem;
`;

const PlusSign = styled.span`
  font-size: 1.5rem;
  display: inline-block;
  padding-left: 5px;
`;

interface FormElements extends HTMLFormControlsCollection {
  userNoteTextarea: HTMLTextAreaElement;
}

interface CustomUserNoteForm extends HTMLFormElement {
  readonly elements: FormElements;
}

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isAddBtnVisible: boolean;
  isRadical: boolean;
  noteType: UserNoteType;
  userNoteContent: string | undefined;
  addMeaningNoteCallback: (userNoteContent: string) => void;
  addReadingNoteCallback: (userNoteContent: string) => void;
};

function EditNoteModal({
  isOpen,
  setIsOpen,
  isAddBtnVisible,
  isRadical,
  noteType,
  userNoteContent,
  addMeaningNoteCallback,
  addReadingNoteCallback,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      if (isOpen) {
        textareaRef.current.focus();
        // cursor moved to end of text
        textareaRef.current.selectionStart = textareaRef.current.value.length;
      } else {
        // helps prevent icky animation choppiness when closing modal
        textareaRef.current.blur();
      }
    }
  }, [isOpen]);

  const noteTypeCapitalized = capitalizeWord(noteType);
  const addButtonTxt = !isRadical
    ? `Add ${noteTypeCapitalized} Note`
    : `Add Note`;

  const isEditing = userNoteContent !== undefined && userNoteContent !== "";

  const handleSubmit = (event: React.ChangeEvent<CustomUserNoteForm>) => {
    event.preventDefault();
    const target = event.currentTarget.elements.userNoteTextarea;
    const userNoteValue = target.value;

    if (userNoteValue === "") {
      displayToast({
        toastType: "warning",
        title: "No Meaning Entered",
        content: "Input was empty, alternative meaning not modified",
        timeout: 10000,
      });
    } else {
      noteType === "meaning"
        ? addMeaningNoteCallback(userNoteValue)
        : addReadingNoteCallback(userNoteValue);
    }

    setIsOpen(false);
  };

  return (
    <Modal onOpenChange={setIsOpen} open={isOpen}>
      {isAddBtnVisible && (
        <AddButtonContainer>
          <Modal.Trigger aria-label={`Add ${noteType} note`} asChild>
            <AddButton className="base-button">
              {addButtonTxt}
              <PlusSign>+</PlusSign>
            </AddButton>
          </Modal.Trigger>
        </AddButtonContainer>
      )}
      <Modal.Content
        modalID="add-user-note-modal"
        title={`${noteTypeCapitalized} Note`}
        isOpen={isOpen}
        delayOpenClose={true}
        description={`Come up with a note that helps you remember the ${noteType}!`}
        icon={noteType === "meaning" ? <MeaningIcon /> : <ReadingIcon />}
        closeOnOutsidePress={false}
      >
        <UserNoteForm onSubmit={handleSubmit}>
          <Fieldset>
            <NoteTextArea
              id="userNoteTextarea"
              ref={textareaRef}
              aria-label={`User ${noteType} Note`}
              defaultValue={userNoteContent}
            />
          </Fieldset>
          <ButtonContainer>
            <SubmitButton
              className="base-button"
              type="submit"
              backgroundColor="var(--ion-color-tertiary)"
              color="black"
            >
              {isEditing ? `Save` : `Add`}
            </SubmitButton>
          </ButtonContainer>
        </UserNoteForm>
      </Modal.Content>
    </Modal>
  );
}

export default EditNoteModal;
