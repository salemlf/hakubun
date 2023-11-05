// export type ToastType = "success" | "error" | "info" | "warning";

// TODO: add styles for loading type
export type ToastType = "success" | "error" | "info" | "warning" | "loading";

export interface ActionProps {
  altText: string;
  children: React.ReactNode;
}
