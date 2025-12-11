"use client";

import { useLocale } from "@/hooks/useLocale";
import { useEffect } from "react";

export function LocaleSync() {
  const { currentLocale } = useLocale();

  useEffect(() => {
    // Hook useLocale đã xử lý việc đồng bộ
    // Component này chỉ cần mount để kích hoạt hook
  }, [currentLocale]);

  return null;
}
