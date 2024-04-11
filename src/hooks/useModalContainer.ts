import { useEffect, useRef, useState } from "react";

export const useModalContainer = (modalID: string, isModalOpen: boolean) => {
  const modalContainerRef = useRef<HTMLElement | null>(
    document.getElementById(modalID)
  );

  //workaround for radix bug
  const [_, forceRender] = useState(0);

  useEffect(() => {
    if (!modalContainerRef.current) {
      modalContainerRef.current = document.createElement("div");
      modalContainerRef.current.className = "modal-container";
      document.body.append(modalContainerRef.current);
    }
    forceRender((prev) => prev + 1);
  }, []);

  // cleans up the modal container so a million aren't created
  useEffect(() => {
    return () => {
      if (
        modalContainerRef &&
        modalContainerRef.current?.childNodes.length === 0
      ) {
        modalContainerRef.current.remove();
        modalContainerRef.current = null;
      }
    };
  }, [modalID]);

  useEffect(() => {
    isModalOpen
      ? document.body.classList.add("modal-open")
      : document.body.classList.remove("modal-open");
  }, [isModalOpen]);

  return { modalContainerRef };
};
