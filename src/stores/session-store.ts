"use client";

import { Constants } from "@/lib/constants/app-constants";
import _ from "lodash";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type SessionStoreType = {
  user: null | {
    id: number;
    email: string;
    created_at: string;
    updated_at: string;
    role: string;
    is_active: number;
    profile: {
      id: number;
      full_name: string;
      created_at: string;
      updated_at: string;
    };
  };
  flashMessage: string;
};

export type SessionStoreActions = {
  setUser: (user: any) => void;

  setFlashMessage: (message: string) => void;
};

export type SessionStore = SessionStoreType & SessionStoreActions;

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => {
      const dfts: SessionStoreType = {
        user: null,
        flashMessage: "",
      };

      return {
        user: dfts.user,
        flashMessage: dfts.flashMessage,
        setUser: (user) => set({ user }),
        setFlashMessage: (message) => {
          console.log("Message was set: ", message);
          set({ flashMessage: message });
        },
      };
    },
    {
      name: Constants.KEY_SESSION_STORE as string,
      storage: createJSONStorage(() => localStorage),
      version: Constants.VERSION_SESSION_STORE as number,
      partialize: (state) => ({
        user: state.user,
        flashMessage: state.flashMessage,
      }),
      merge(persistedState, currentState) {
        return _.merge(currentState, persistedState);
      },
    }
  )
);
