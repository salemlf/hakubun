import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ForwardedRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { PanInfo, motion, useAnimation } from "framer-motion";
import Button from "../Button/Button";
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

const Portal = styled(RadixDialog.Portal)`
  .container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Content = styled(RadixDialog.Content)`
  width: 100%;
  border-radius: 12px 12px 0 0;
  height: 100%;
  background-color: var(--light-greyish-purple);
  overflow-y: clip;
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

const DialogOpenContext = createContext<boolean>(false);

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
    <DialogOpenContext.Provider value={isOpen}>
      <RadixDialog.Root
        onOpenChange={setIsOpen}
        open={isOpen}
        {...props}
        modal={false}
      >
        {children}
      </RadixDialog.Root>
    </DialogOpenContext.Provider>
  );
}

const overlayVariants = {
  closed: { opacity: 0, pointerEvents: "none" as const },
  open: { opacity: 1, pointerEvents: "auto" as const },
};

// TODO: move this hook to a separate file
// cred to Nadia Makarevich, tutorial here: https://www.developerway.com/posts/implementing-advanced-use-previous-hook
const usePrevious = <TValue extends unknown>(value: TValue) => {
  const ref = useRef<{ value: TValue; prev: TValue | null }>({
    value: value,
    prev: null,
  });

  const current = ref.current.value;

  if (value !== current) {
    ref.current = {
      value: value,
      prev: current,
    };
  }

  return ref.current.prev;
};

type BottomSheetContentCoreProps = RadixDialog.DialogContentProps & {
  title: string;
};

// TODO: pass px height values for page header and to bottom sheet header to be used in variants
// TODO: modify so interacting outside moves dialog to lowest breakpoint
function BottomSheetContentCore(
  { title, children, className, ...props }: BottomSheetContentCoreProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const isOpen = useContext(DialogOpenContext);
  // *testing
  console.log("🚀 ~ file: Sheet.tsx:102 ~ isOpen:", isOpen);
  // *testing

  const [isFullyOpen, setIsFullyOpen] = useState(false);

  const onSheetBtnPress = (e: any) => {
    if (isFullyOpen) {
      controls.start("mostlyClosed");
      setIsFullyOpen(false);
    } else {
      controls.start("fullyOpen");
      setIsFullyOpen(true);
    }
  };

  const prevIsOpen = usePrevious(isOpen);
  const controls = useAnimation();

  useEffect(() => {
    if (!prevIsOpen && isOpen) {
      controls.start("mostlyClosed");
    } else if (prevIsOpen && isOpen) {
      controls.start("fullyOpen");
    }
  }, [controls, isOpen, prevIsOpen]);

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const shouldClose =
      info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      controls.start("mostlyClosed");
    } else {
      controls.start("fullyOpen");
    }
  };

  return (
    <Portal>
      <RadixDialog.Overlay className="overlay" forceMount asChild>
        <Overlay
          variants={overlayVariants}
          animate={isOpen ? "open" : "closed"}
          initial={false}
        />
      </RadixDialog.Overlay>

      <Content
        onEscapeKeyDown={(event: any) => event.preventDefault()}
        onInteractOutside={(event: any) => event.preventDefault()}
        forceMount
        className="content"
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
          // TODO: for fullyOpen variant, use calc(100% - {PAGE_HEADER_HEIGHT}px - {SOME_MARGIN})
          // TODO: for mostlyClosed variant, use calc(100% -{BOTTOM_SHEET_HEADER_HEIGHT}px)
          variants={{
            mostlyClosed: { y: "calc(100% - 100px)" },
            fullyOpen: { y: 75 },
            // closed: { y: "100%" },
          }}
          dragConstraints={{ top: 0 }}
          dragElastic={0.3}
          style={{
            display: "inline-block",
            height: "100vh",
            overflowY: "hidden",
            zIndex: 5,
          }}
        >
          <SheetHeader>
            <SheetOpenCloseButton onPress={onSheetBtnPress} />
            <SheetHeadingTxt>{title}</SheetHeadingTxt>
          </SheetHeader>
          {children}
        </motion.div>
      </Content>
    </Portal>
  );
}

export const BottomSheetContent = forwardRef(BottomSheetContentCore);
export default BottomSheetRoot;
