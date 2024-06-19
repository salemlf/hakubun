import { useCallback, useEffect, useState } from "react";
import { useBlocker, useLocation } from "@tanstack/react-router";
import { Location } from "react-router-dom";
import { useIsBottomSheetOpen } from "../../contexts/BottomSheetOpenContext";
import AlertModal, { AlertModalContentProps } from "../AlertModal";

type ShouldBlockParams = {
  currentLocation: Location<unknown>;
  nextLocation: Location<unknown>;
};

const blockUserLeavingPage = ({
  currentLocation,
  nextLocation,
}: ShouldBlockParams) => {
  // Only try to block if moving from lessons / reviews directly to the home screen without wrapping up
  return (
    (currentLocation.pathname.endsWith("/session") ||
      currentLocation.pathname == "/lessons/quiz") &&
    nextLocation.pathname == "/"
  );
};

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
  const shouldBlock = useCallback(
    ({ currentLocation, nextLocation }: ShouldBlockParams) => {
      return blockUserLeavingPage({ currentLocation, nextLocation });
    },
    [location.pathname]
  );
  const {
    proceed: proceedNavigating,
    reset: cancelNavigating,
    status,
  } = useBlocker({
    condition: shouldBlock,
  });
  const [isNavBlocked, setIsNavBlocked] = useState(status === "blocked");
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useIsBottomSheetOpen();

  // resetting the blocker in case it's somehow already blocked
  useEffect(() => {
    if (isNavBlocked) {
      cancelNavigating();
    }
  }, []);

  useEffect(() => {
    setIsNavBlocked(status === "blocked");
  }, [status]);

  useEffect(() => {
    if (isNavBlocked && isBottomSheetOpen) {
      cancelNavigating();
      setIsBottomSheetOpen(false);
    }
  }, [isNavBlocked, isBottomSheetOpen]);

  return (
    <>
      {isNavBlocked && (
        <AlertModal open={isNavBlocked}>
          <AlertModal.Content
            modalID={modalID}
            isOpen={isNavBlocked}
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
