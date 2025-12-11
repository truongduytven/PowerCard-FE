"use client";
import GlobalProvider from "@/contexts/globalState";
import ProtectedSignRoute from "@/components/protectedSignRoute";
import { Toaster } from "sonner";

export default function LandingPage() {
  return (
    <GlobalProvider>
      <Toaster position="top-right" richColors />
      <ProtectedSignRoute>
        <div>Landing Page - Public content here</div>
      </ProtectedSignRoute>
    </GlobalProvider>
  );
}
