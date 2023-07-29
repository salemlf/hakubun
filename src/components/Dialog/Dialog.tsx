import { useRef } from "react";
import { useDialog } from "react-aria";
import type { AriaDialogProps } from "react-aria";

interface DialogProps extends AriaDialogProps {
  title?: React.ReactNode;
  children: React.ReactNode;
}

// TODO: this is causing a Uncaught InternalError: too much recursion bug trying to focus last descendent, fix
function Dialog({ title, children, ...props }: DialogProps) {
  let ref = useRef(null);
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} style={{ padding: 30 }}>
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}

export default Dialog;
