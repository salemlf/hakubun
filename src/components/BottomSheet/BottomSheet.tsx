import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ForwardedRef } from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { PanInfo, motion, useMotionValue } from "framer-motion";
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
  position: fixed;
  width: 100%;
  border-radius: 12px 12px 0 0;
  /* height: 95%; */
  height: 100%;
  bottom: -75px;
  background-color: var(--light-greyish-purple);
  overflow-y: clip;
  padding-bottom: 75px;
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

const swipeConfidenceThreshold = 6000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// TODO: pass in px from bottom for mostly closed state, will be calculated based header height
// TODO: add a handle/button so can easily click to swap between opening and closing
// TODO: modify so interacting outside moves dialog to lowest breakpoint
function BottomSheetContentCore(
  { children, className, ...props }: RadixDialog.DialogContentProps,
  forwardedRef: ForwardedRef<HTMLDivElement>
) {
  const isOpen = useContext(DialogOpenContext);
  // *testing
  console.log("🚀 ~ file: Sheet.tsx:102 ~ isOpen:", isOpen);
  // *testing

  const motionY = useMotionValue(0);
  const [position, setPosition] = useState<number>(600);

  useEffect(() => {
    motionY.set(position);
  }, [position, motionY]);

  // TODO: modify this so it adds and subtracts position based on height of viewport
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    let swipe = swipePower(info.offset.y, info.velocity.y);

    // *testing
    console.log("🚀 ~ file: Sheet.tsx:145 ~ position:", position);
    // *testing

    if (swipe < -swipeConfidenceThreshold) {
      // *testing
      console.log("PULLED UP");
      // *testing
      if (position > 0) {
        setPosition(position - 600);
      }
    } else if (swipe > swipeConfidenceThreshold) {
      // *testing
      console.log("PULLED DOWN");
      // *testing
      if (position <= 0) {
        setPosition(position + 600);
      }
    }
  };

  return (
    // <Portal container={getEnsureDialogContainer()} forceMount>
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
          // style={{ y: motionY }}
          animate={{ y: position }}
          transition={{
            y: { duration: 1, type: "spring" },
          }}
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: position,
          }}
          onDragEnd={onDragEnd}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          initial={false}
          dragSnapToOrigin={true}
        >
          {children}
        </motion.div>
      </Content>
    </Portal>
    // </Portal>
  );
}

export const BottomSheetContent = forwardRef(BottomSheetContentCore);
export default BottomSheetRoot;
