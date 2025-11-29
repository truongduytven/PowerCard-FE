"use client";
import GlobalProvider from "@/contexts/globalState";
import React from "react";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/protectedRoute";

export default function LayoutUser(props: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <Toaster position="top-right" richColors />
      <ProtectedRoute>
        {props.children}
      </ProtectedRoute>
    </GlobalProvider>
  );
}
