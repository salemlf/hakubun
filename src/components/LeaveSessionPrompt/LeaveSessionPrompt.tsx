import { useEffect, useMemo } from "react";
import { useBlocker, useLocation } from "@tanstack/react-router";
import { useIsBottomSheetOpen } from "../../contexts/BottomSheetOpenContext";
import AlertModal, { AlertModalContentProps } from "../AlertModal";

type Props = Omit<
  AlertModalContentProps,
  "isOpen" | "cancelText" | "onCancelClick"
>;

// TODO: this dialog pops up twice, fix
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

  const shouldBlock = useMemo(() => {
    return (
      location.pathname.endsWith("session") ||
      location.pathname.endsWith("quiz")
    );
  }, [location.pathname]);

  const {
    proceed: proceedNavigating,
    reset: cancelNavigating,
    status,
  } = useBlocker({
    condition: shouldBlock,
  });

  const { isBottomSheetOpen, setIsBottomSheetOpen } = useIsBottomSheetOpen();

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
