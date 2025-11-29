"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext } from "react";
import type { ReactNode } from "react";

interface GlobalStateType {
  pathname: string;
  NextPage: (path: string) => void;
  NextPageReplace: (path: string) => void;
}

export const GlobalState = createContext<GlobalStateType>({
  pathname: "",
  NextPage: (path: string) => {},
  NextPageReplace: (path: string) => {}
});

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const NextPage = (path: string) => {
    window.scrollTo(0, 0);
    router.push(path);
  };

  const NextPageReplace = (path: string) => {
    window.scrollTo(0, 0);
    router.replace(path);
  };

  return (
    <GlobalState.Provider value={{ pathname, NextPage, NextPageReplace }}>
      {children}
    </GlobalState.Provider>
  );
};