"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { locales } from "../../i18n";

const LOCALE_COOKIE_KEY = "POWERCARD_LOCALE";

/**
 * Hook để đồng bộ locale giữa URL và cookie
 */
export function useLocale() {
  const pathname = usePathname();
  const router = useRouter();

  // Lấy locale hiện tại từ URL
  const getCurrentLocale = (): string => {
    const match = pathname?.match(/^\/(en|vi)(?:\/|$)/);
    return match ? match[1] : "vi";
  };

  const currentLocale = getCurrentLocale();

  useEffect(() => {
    // Đồng bộ vào cookie (để middleware có thể đọc)
    document.cookie = `${LOCALE_COOKIE_KEY}=${currentLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;
  }, [currentLocale]);

  const changeLocale = (newLocale: string) => {
    // Validate locale
    if (!locales.includes(newLocale as any)) {
      newLocale = "vi"; // fallback
    }

    // Lưu vào cookie
    document.cookie = `${LOCALE_COOKIE_KEY}=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;

    // Update URL
    let newPath = pathname || "/";
    if (/^\/(en|vi)(?:\/|$)/.test(newPath)) {
      newPath = newPath.replace(/^\/(en|vi)/, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${newPath === "/" ? "" : newPath}`;
    }

    router.push(newPath);
  };

  return {
    currentLocale,
    changeLocale,
  };
}
