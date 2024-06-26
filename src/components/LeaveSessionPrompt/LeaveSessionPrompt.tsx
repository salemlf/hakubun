import { useCallback, useEffect } from "react";
import { Location } from "react-router-dom";
import { useIsBottomSheetOpen } from "../../contexts/BottomSheetOpenContext";
import { useNavBlocker } from "../../hooks/useNavBlocker";
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
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useIsBottomSheetOpen();

  const shouldBlock = useCallback(
    ({ currentLocation, nextLocation }: ShouldBlockParams) => {
      return blockUserLeavingPage({ currentLocation, nextLocation });
    },
    []
  );
  const { isNavBlocked, proceedNavigating, cancelNavigating } =
    useNavBlocker(shouldBlock);

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
