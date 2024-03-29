import { forwardRef, useEffect, useRef, useState } from "react";
import type { ForwardedRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { PanInfo, motion, useAnimation } from "framer-motion";
import { FocusScope } from "react-aria";
import { useIsBottomSheetOpen } from "../../contexts/BottomSheetOpenContext";
import Button from "../Button/Button";
import GhostParent from "../GhostParent";
import styled from "styled-components";

const Content = styled(RadixDialog.Content)`
  width: 100%;
  border-radius: 12px 12px 0 0;
  height: 100%;
  background-color: var(--light-greyish-purple);
  overflow-y: clip;
  pointer-events: auto;
  position: absolute;
  background-color: var(--dark-greyish-purple);
`;

const SheetHeader = styled.header`
  background-color: var(--foreground-color);
  padding: 5px 0 10px;
  color: white;
  text-align: center;
`;

const SheetHeadingTxt = styled(RadixDialog.Title)`
  font-size: 1.25rem;
  margin: 15px 0;
`;

const SheetOpenCloseButton = styled(Button)`
  width: 75px;
  height: 12px;
  border-radius: 1rem;
  border: 1px solid black;

  &:focus-visible {
    outline: 2px solid white;
  }
`;

const SheetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 21;
  overflow-y: hidden;
  pointer-events: none;
`;

function BottomSheetRoot({ children, ...props }: RadixDialog.DialogProps) {
  return (
    <RadixDialog.Root defaultOpen={true} {...props} modal={false}>
      {children}
    </RadixDialog.Root>
  );
}

const sheetPosVariants = {
  fullyOpen: { y: 0 },
  mostlyClosed: (dragHeight: number) => ({
    y: dragHeight,
  }),
  closed: { y: "100%" },
};

type BottomSheetContentCoreProps = RadixDialog.DialogContentProps & {
  height: number;
  title: string;
};

const sheetHeightMargin = 100;

// TODO: fix bug where can't tab back once tabbed to open/close button (workaround rn is to open sheet and then tab back)
function BottomSheetContentCore(
  { title, height, children, ...props }: BottomSheetContentCoreProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const [headerHeight, setHeaderHeight] = useState(0);
  // TODO: change to not use "any" type
  const headerRef = useRef<any>(null);
  const sheetContainerRef = useRef<HTMLDivElement>(null);
  const dragHeight = height - headerHeight - sheetHeightMargin;
  const controls = useAnimation();
  const { isBottomSheetOpen, setIsBottomSheetOpen } = useIsBottomSheetOpen();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  const mostlyClose = () => {
    controls.start("mostlyClosed");
    setIsBottomSheetOpen(false);
  };

  const fullyOpen = () => {
    controls.start("fullyOpen");
    setIsBottomSheetOpen(true);
  };

  const onSheetBtnPress = () => {
    if (isBottomSheetOpen) {
      mostlyClose();
    } else {
      fullyOpen();
    }
  };

  useEffect(() => {
    if (!isBottomSheetOpen) {
      mostlyClose();
    }
  }, [controls, headerHeight]);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offsetTriggersChange = Math.abs(info.offset.y) > 300;
    const velocityTriggersChange = Math.abs(info.velocity.y) > 400;
    console.log(
      "🚀 ~ file: BottomSheet.tsx:130 ~ info.velocity.y:",
      info.velocity.y
    );
    if (offsetTriggersChange || velocityTriggersChange) {
      const shouldClose =
        info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
      if (shouldClose) {
        mostlyClose();
      } else {
        fullyOpen();
      }
    }
    // going back to previous position
    else {
      isBottomSheetOpen ? fullyOpen() : mostlyClose();
    }
  };

  return (
    <SheetContainer ref={sheetContainerRef}>
      <Content
        onEscapeKeyDown={(event: KeyboardEvent) => {
          event.preventDefault();
          if (isBottomSheetOpen) {
            mostlyClose();
          }
        }}
        onInteractOutside={(event: Event) => {
          event.preventDefault();
          if (isBottomSheetOpen) {
            mostlyClose();
          }
        }}
        forceMount
        ref={forwardedRef}
        asChild
        {...props}
      >
        <motion.div
          drag="y"
          onDragEnd={onDragEnd}
          initial="mostlyClosed"
          animate={controls}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          custom={dragHeight}
          variants={sheetPosVariants}
          dragConstraints={{ top: 0, bottom: dragHeight }}
          dragElastic={0.3}
          style={{
            width: "100%",
            height: height - sheetHeightMargin,
            // overflowY: "hidden",
            zIndex: 5,
          }}
        >
          {isBottomSheetOpen ? (
            <FocusScope contain autoFocus>
              <SheetHeader ref={headerRef}>
                <SheetOpenCloseButton
                  data-testid="bottom-sheet-btn"
                  onPress={onSheetBtnPress}
                  aria-label="Open or close the bottom sheet"
                />
                <SheetHeadingTxt>{title}</SheetHeadingTxt>
              </SheetHeader>
              {children}
            </FocusScope>
          ) : (
            <>
              <SheetHeader ref={headerRef}>
                <SheetOpenCloseButton
                  data-testid="bottom-sheet-btn"
                  onPress={onSheetBtnPress}
                />
                <SheetHeadingTxt>{title}</SheetHeadingTxt>
              </SheetHeader>
              <GhostParent inert="true">{children}</GhostParent>
            </>
          )}
        </motion.div>
      </Content>
    </SheetContainer>
  );
}

export const BottomSheetContent = forwardRef(BottomSheetContentCore);
export default BottomSheetRoot;
