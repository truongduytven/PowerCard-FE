"use client";
import GlobalProvider from "@/contexts/globalState";
import ProtectedSignRoute from "@/components/protectedSignRoute";
import { Toaster } from "sonner";
import { useTranslations } from "next-intl";
export default function LandingPage() {
  const t = useTranslations("Home");
  return (
    <GlobalProvider>
      <Toaster position="top-right" richColors />
      <ProtectedSignRoute>
        <div>
          Landing Page - Public content here
          <div>
            <h1>{t("title")}</h1>
            <p>{t("desc")}</p>
          </div>
        </div>
      </ProtectedSignRoute>
    </GlobalProvider>
  );
}
