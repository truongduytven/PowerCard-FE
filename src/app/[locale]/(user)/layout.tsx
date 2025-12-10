"use client";
import GlobalProvider from "@/contexts/globalState";
import React from "react";
import { Toaster } from "sonner";
import ProtectedRoute from "@/components/protectedRoute";
import Navbar from "@/components/navbar";

export default function LayoutUser(props: { children: React.ReactNode }) {
  return (
    <GlobalProvider>
      <Toaster position="top-right" richColors />
      {/* <ProtectedRoute> */}
      <Navbar />
      {props.children}
      {/* </ProtectedRoute> */}
    </GlobalProvider>
  );
}
