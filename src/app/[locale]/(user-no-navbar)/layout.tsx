"use client";

import ProtectedRoute from "@/components/protectedRoute";
import GlobalProvider from "@/contexts/globalState";
import { Toaster } from "sonner";

export default function UserNoNavbarLayout(props: { children: React.ReactNode }) {
    return (
        <GlobalProvider>
            <Toaster position="top-right" richColors />
            <ProtectedRoute>
                {props.children}
            </ProtectedRoute>
        </GlobalProvider>
    );
}
