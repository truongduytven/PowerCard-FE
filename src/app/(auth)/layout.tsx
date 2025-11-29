"use client";
import GlobalProvider from "@/contexts/globalState";
import React from "react";
import { Toaster } from "sonner";
import ProtectedSignRoute from "@/components/protectedSignRoute";

export default function LayoutAuth(props: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <Toaster position="top-right" richColors />
      <ProtectedSignRoute>
        {props.children}
      </ProtectedSignRoute>
    </GlobalProvider>
  );
}
