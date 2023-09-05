import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ForwardedRef, RefObject } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import {
  AnimationControls,
  PanInfo,
  motion,
  useAnimation,
} from "framer-motion";
import { FocusScope } from "react-aria";
import { useWindowSize } from "usehooks-ts";
import { usePrevious } from "../../hooks/usePrevious";
import Button from "../Button/Button";
import GhostParentWrapper from "../GhostParentWrapper";
import styled from "styled-components";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
`;

const Content = styled(RadixDialog.Content)`
  width: 100%;
  border-radius: 12px 12px 0 0;
  height: 100%;
  background-color: var(--light-greyish-purple);
  overflow-y: clip;
  pointer-events: auto;
  /* !added */
  position: absolute;
  /* !added */
`;

const SheetHeader = styled.header`
  background-color: var(--light-greyish-purple);
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
  height: 10px;
  border-radius: 1rem;
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
  z-index: 5;
  overflow-y: hidden;
  pointer-events: none;
`;

const SheetContext = createContext<boolean>(false);

type BottomSheetRootProps = RadixDialog.DialogProps & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function BottomSheetRoot({
  isOpen,
  setIsOpen,
  children,
  ...props
}: BottomSheetRootProps) {
  return (
    <SheetContext.Provider value={isOpen}>
      <RadixDialog.Root
        onOpenChange={setIsOpen}
        open={isOpen}
        {...props}
        modal={false}
      >
        {children}
      </RadixDialog.Root>
    </SheetContext.Provider>
  );
}

const overlayVariants = {
  closed: { opacity: 0, pointerEvents: "none" as const },
  open: { opacity: 1, pointerEvents: "auto" as const },
};

const sheetPosVariants = {
  fullyOpen: { y: 0 },
  mostlyClosed: (dragHeight: number) => ({
    y: dragHeight,
  }),
  closed: { y: "100%" },
};

type BottomSheetContentCoreProps = RadixDialog.DialogContentProps & {
  title: string;
};

const sheetHeightMargin = 100;

// TODO: fix bug where can't tab back once tabbed to open/close button (workaround rn is to open sheet and then tab back)
function BottomSheetContentCore(
  { title, children, className, ...props }: BottomSheetContentCoreProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const isOpen = useContext(SheetContext);
  const [headerHeight, setHeaderHeight] = useState(0);
  // TODO: change to not use "any" type
  const headerRef = useRef<any>(null);
  const sheetContainerRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();
  const dragHeight = height - headerHeight - sheetHeightMargin;

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.clientHeight);
    }
  }, [headerRef.current]);

  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const prevIsOpen = usePrevious(isOpen);
  const controls = useAnimation();

  const mostlyClose = () => {
    controls.start("mostlyClosed");
    setIsFullyOpen(false);
  };

  const fullyOpen = () => {
    controls.start("fullyOpen");
    setIsFullyOpen(true);
  };

  const onSheetBtnPress = (e: any) => {
    if (isFullyOpen) {
      mostlyClose();
    } else {
      fullyOpen();
    }
  };

  // TODO: modify so not using a bunch of if statements
  useEffect(() => {
    if (!prevIsOpen && isOpen) {
      mostlyClose();
    } else if (prevIsOpen && isOpen) {
      fullyOpen();
    } else if (prevIsOpen && !isOpen) {
      // need to mostly close first so that the sheet is in the right position to close
      mostlyClose();
    }
    if (!isOpen) {
      controls.start("closed");
    }
  }, [controls, isOpen, prevIsOpen, headerHeight]);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    let offsetTriggersChange = Math.abs(info.offset.y) > 300;
    if (offsetTriggersChange) {
      const shouldClose =
        info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
      if (shouldClose) {
        mostlyClose();
      } else {
        fullyOpen();
      }
    } else {
      isFullyOpen ? fullyOpen() : mostlyClose();
    }
  };

  return (
    <SheetContainer ref={sheetContainerRef}>
      <RadixDialog.Overlay className="overlay" asChild>
        <Overlay
          variants={overlayVariants}
          animate={isOpen ? "open" : "closed"}
          initial={false}
        />
      </RadixDialog.Overlay>

      <Content
        onEscapeKeyDown={(event: any) => {
          event.preventDefault();
          if (isFullyOpen) {
            mostlyClose();
          }
        }}
        onInteractOutside={(event: any) => {
          event.preventDefault();
          if (isFullyOpen) {
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
            overflowY: "hidden",
            zIndex: 5,
          }}
        >
          {isFullyOpen ? (
            <FocusScope contain autoFocus>
              <SheetHeader ref={headerRef}>
                <SheetOpenCloseButton onPress={onSheetBtnPress} />
                <SheetHeadingTxt>{title}</SheetHeadingTxt>
              </SheetHeader>
              {children}
            </FocusScope>
          ) : (
            <>
              <SheetHeader ref={headerRef}>
                <SheetOpenCloseButton onPress={onSheetBtnPress} />
                <SheetHeadingTxt>{title}</SheetHeadingTxt>
              </SheetHeader>
              <GhostParentWrapper inert>{children}</GhostParentWrapper>
            </>
          )}
        </motion.div>
      </Content>
    </SheetContainer>
  );
}

export const BottomSheetContent = forwardRef(BottomSheetContentCore);
export default BottomSheetRoot;
