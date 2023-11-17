import { ToastProps } from "@radix-ui/react-toast";

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface ActionProps {
  altText: string;
  children: React.ReactNode;
}

export type ToastPropsWithCustomContent = Omit<
  ToastProps,
  "content" | "duration"
> & {
  content?: string | React.ReactNode;
};
