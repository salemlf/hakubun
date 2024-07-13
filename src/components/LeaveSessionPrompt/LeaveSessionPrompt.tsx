import { useEffect, useMemo } from "react";
import { useBlocker, useLocation } from "@tanstack/react-router";
import useAssignmentQueueStoreFacade from "../../stores/useAssignmentQueueStore/useAssignmentQueueStore.facade";
import { useIsBottomSheetOpen } from "../../contexts/BottomSheetOpenContext";
import AlertModal, { AlertModalContentProps } from "../AlertModal";

type Props = Omit<
  AlertModalContentProps,
  "isOpen" | "cancelText" | "onCancelClick"
>;

function LeaveSessionPrompt({
  modalID,
  title,
  confirmText,
  description,
  showAddtlAction = false,
  onConfirmClick,
  onAddtlActionClick = () => {},
}: Props) {
  const location = useLocation();
  const { assignmentQueue } = useAssignmentQueueStoreFacade();
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useIsBottomSheetOpen();

  const shouldBlock = useMemo(() => {
    return (
      assignmentQueue.length > 0 &&
      (location.pathname.endsWith("session") ||
        location.pathname.endsWith("quiz"))
    );
  }, [location.pathname, assignmentQueue.length]);

  const {
    proceed: proceedNavigating,
    reset: cancelNavigating,
    status,
  } = useBlocker({
    condition: shouldBlock,
  });

  // necessary to prevent dialog from popping up twice
  useEffect(() => {
    if (status === "blocked" && !shouldBlock) {
      proceedNavigating();
    }
  }, [status]);

  useEffect(() => {
    if (status === "blocked" && isBottomSheetOpen) {
      cancelNavigating();
      setIsBottomSheetOpen(false);
    }
  }, [status, isBottomSheetOpen]);

  return (
    <>
      {status === "blocked" && (
        <AlertModal open={status === "blocked"}>
          <AlertModal.Content
            modalID={modalID}
            isOpen={status === "blocked"}
            title={title}
            confirmText={confirmText}
            description={description}
            cancelText="Cancel"
            onConfirmClick={() => {
              onConfirmClick();
              proceedNavigating();
            }}
            onCancelClick={() => {
              cancelNavigating();
            }}
            showAddtlAction={showAddtlAction}
            addtlActionText="Wrap Up"
            onAddtlActionClick={() => {
              onAddtlActionClick();
              cancelNavigating();
            }}
          />
        </AlertModal>
      )}
    </>
  );
}

export default LeaveSessionPrompt;
