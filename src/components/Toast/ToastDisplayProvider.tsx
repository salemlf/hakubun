import * as ToastPrimitive from "@radix-ui/react-toast";
import { AnimatePresence } from "framer-motion";
import { useToastStore } from "./Toast.store";
import { Toast } from ".";
import styled from "styled-components";

const Viewport = styled(ToastPrimitive.Viewport)`
  top: 0;
  left: 50%;
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;
  width: 100vw;
  max-width: 500px;
  margin: 0;
  list-style: none;
  outline: none;
`;

// cred: based off of this example: https://stackblitz.com/edit/node-7fhpwe?file=src%2Fnotify.tsx
export function ToastDisplayProvider() {
  const { notifications, closeToast } = useToastStore();

  return (
    <ToastPrimitive.Provider>
      <AnimatePresence>
        {notifications.map((toast) => (
          <Toast
            open={toast.open ?? true}
            setOpen={(open) => {
              if (open === false && toast.allowClose === true) {
                closeToast(toast.id);
              }
            }}
            toastType={toast.toastType}
            title={toast.title}
            key={toast.id}
            timeout={toast.timeout}
            content={toast.content}
            allowClose={toast.allowClose}
          />
        ))}
      </AnimatePresence>

      <Viewport />
    </ToastPrimitive.Provider>
  );
}
