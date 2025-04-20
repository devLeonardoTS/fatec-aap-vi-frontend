"use client";

import { useSessionStore } from "@/stores/session-store";
import { PropsWithChildren, useLayoutEffect } from "react";
import { toast } from "react-toastify";

export function FlashProvider({ children }: PropsWithChildren<{}>) {
  const { flashMessage: message, setFlashMessage: setMessage } =
    useSessionStore();

  useLayoutEffect(() => {
    if (message) {
      toast.info(message);
      setTimeout(() => setMessage(""), 1000);
    }
  }, [message]);

  return children;
}
