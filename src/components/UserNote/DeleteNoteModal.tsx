import { useEffect, useRef } from "react";
import { capitalizeWord } from "../../services/MiscService/MiscService";
import { displayToast } from "../Toast/Toast.service";
import { UserNoteType } from "../../types/MiscTypes";
import AlertModal from "../AlertModal";

const generateNoteHeadingsAngMsg = (
  isRadical: boolean,
  noteType: UserNoteType
) => {
  const noteTypeCapitalized = capitalizeWord(noteType);

  if (isRadical) {
    return {
      alertHeadingTxt: "Delete Note",
      alertHeadingMsg:
        "Are you sure you want to delete your radical name note?",
    };
  } else {
    return {
      alertHeadingTxt: `Delete ${noteTypeCapitalized} Note`,
      alertHeadingMsg: `Are you sure you want to delete your ${noteType} note?`,
    };
  }
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isRadical: boolean;
  noteType: UserNoteType;
  deleteMeaningNoteCallback: () => void;
  deleteReadingNoteCallback: () => void;
};

function DeleteNoteModal({
  isOpen,
  setIsOpen,
  isRadical,
  noteType,
  deleteMeaningNoteCallback,
  deleteReadingNoteCallback,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const noteHeadingsAndMsg = generateNoteHeadingsAngMsg(isRadical, noteType);

  useEffect(() => {
    if (isOpen) {
      textareaRef.current?.focus();
    }
  }, [isOpen]);

  const onCancelDelete = () => {
    setIsOpen(false);
    const noteTxt = isRadical ? "radical name" : noteType;
    displayToast({
      toastType: "warning",
      title: `Cancelled Note Deletion`,
      content: `Cancelled deleting your ${noteTxt} note`,
      timeout: 10000,
    });
  };

  const onConfirmDelete = () => {
    noteType === "meaning"
      ? deleteMeaningNoteCallback()
      : deleteReadingNoteCallback();
  };

  return (
    <AlertModal open={isOpen} onOpenChange={setIsOpen}>
      <AlertModal.Content
        modalID="delete-meaning-note-alert-modal"
        isOpen={isOpen}
        title={noteHeadingsAndMsg.alertHeadingTxt}
        description={noteHeadingsAndMsg.alertHeadingMsg}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirmClick={onConfirmDelete}
        onCancelClick={onCancelDelete}
      />
    </AlertModal>
  );
}

export default DeleteNoteModal;
