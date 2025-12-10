"use client";

import { Button } from "@/components/ui/button";
import {
  Bell,
  BookOpen,
  Compass,
  GraduationCap,
  Home,
  Layers,
  Menu as MenuIcon,
  Moon,
  PlusCircle,
  Sun,
  User,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../public/Logo.png";
import { locales } from "../../i18n";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const localeMatch = pathname?.match(/^\/(en|vi)(?:\/|$)/);
  const currentLocale = localeMatch ? localeMatch[1] : "vi";
  const basePath = pathname
    ? localeMatch
      ? pathname.replace(new RegExp(`^/${currentLocale}`), "") || "/"
      : pathname
    : "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { id: 1, href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
    {
      id: 2,
      href: "/decks",
      label: "My Decks",
      icon: <Layers className="h-4 w-4" />,
    },
    {
      id: 3,
      href: "/create",
      label: "Create",
      icon: <PlusCircle className="h-4 w-4" />,
    },
    {
      id: 4,
      href: "/study",
      label: "Study",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      id: 5,
      href: "/explore",
      label: "Explore",
      icon: <Compass className="h-4 w-4" />,
    },
    {
      id: 6,
      href: "/overview",
      label: "Overview",
      icon: <GraduationCap className="h-4 w-4" />,
    },
  ];

  // Hàm kiểm tra active link
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return basePath === "/";
    }
    return basePath.startsWith(href);
  };

  const gradientColors = {
    from: "from-pink-400",
    via: "via-fuchsia-400",
    to: "to-purple-400",

    text: "from-pink-400 via-fuchsia-400 to-purple-400",

    bg: "from-pink-300 to-purple-400",
    hover: "hover:from-pink-500 hover:to-purple-500",

    light: "from-pink-200 to-purple-300",
    dark: "dark:from-pink-500 dark:to-purple-600",

    overlay: "from-pink-400/10 to-purple-400/10",
    overlayHover: "group-hover:from-pink-400/20 group-hover:to-purple-400/20",

    activeOverlay:
      "from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30",
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b"
      }`}
    >
      <div className="max-w-8xl mx-auto flex h-16 items-center justify-between px-4 md:px-8 lg:px-20">
        <div className="flex items-center gap-8 lg:gap-12">
          <a
            href={`/${currentLocale}`}
            className="flex items-center gap-3 group h-16"
          >
            <div className="h-full flex items-center justify-center px-2">
              <div className="relative h-full flex items-center justify-center min-w-[60px]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradientColors.overlay} opacity-0 ${gradientColors.overlayHover} transition-opacity duration-300`}
                />
                <Image
                  src={logo}
                  alt="PowerCard Logo"
                  width={0}
                  height={64}
                  className="h-full w-auto object-contain max-h-12 group-hover:scale-105 transition-transform duration-300"
                  style={{
                    height: "100%",
                    maxHeight: "3rem",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>

            <div className="hidden md:block">
              <h1
                className={`text-xl font-bold bg-gradient-to-r ${gradientColors.text} bg-clip-text text-transparent`}
              >
                PowerCard
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Smart Learning
              </p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => {
              const isActive = isActiveLink(link.href);
              const linkHref = `/${currentLocale}${
                link.href === "/" ? "" : link.href
              }`;
              return (
                <a
                  key={link.id}
                  href={linkHref}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative group
                    ${
                      isActive
                        ? `text-purple-600 dark:text-pink-400 bg-gradient-to-r ${gradientColors.activeOverlay} shadow-sm`
                        : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-pink-400"
                    }`}
                >
                  <span
                    className={`transition-transform duration-300 ${
                      isActive
                        ? "scale-110 text-purple-600 dark:text-pink-400"
                        : "group-hover:scale-110 group-hover:text-purple-500 dark:group-hover:text-pink-400"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.label}</span>

                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r ${gradientColors.bg} rounded-full`}
                    />
                  )}

                  <span
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r from-pink-500/0 to-purple-500/0 
                    group-hover:from-pink-500/5 group-hover:to-purple-500/5 transition-all duration-300`}
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-9 w-9 rounded-full relative hover:scale-105 transition-all duration-300 hover:text-purple-600 dark:hover:text-pink-400"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full animate-pulse" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-9 w-9 rounded-full hover:scale-105 transition-all duration-300 
              hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-pink-400"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {/* Locale select */}
          <div className="hidden sm:flex items-center">
            <label htmlFor="locale-select" className="sr-only">
              Choose language
            </label>
            <select
              id="locale-select"
              value={(() => {
                const m = pathname?.match(/^\/(en|vi)(?:\/|$)/);
                return m ? m[1] : "vi";
              })()}
              onChange={(e) => {
                const newLocale = e.target.value;
                let newPath = pathname || "/";
                if (/^\/(en|vi)(?:\/|$)/.test(newPath)) {
                  newPath = newPath.replace(/^\/(en|vi)/, `/${newLocale}`);
                } else {
                  newPath = `/${newLocale}${newPath === "/" ? "" : newPath}`;
                }
                router.push(newPath);
              }}
              className="h-9 pl-2 pr-6 rounded-md border border-gray-200 dark:border-gray-700 bg-white/0 text-sm text-gray-700 dark:text-gray-200"
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {loc.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="h-9 w-px bg-gray-200 dark:bg-gray-700" />
            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full transition-all duration-300 hover:scale-105 ${
                pathname === "/profile"
                  ? `bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40`
                  : ""
              }`}
            >
              <div
                className={`h-9 w-9 rounded-full bg-gradient-to-r ${gradientColors.bg} ${gradientColors.hover} transition-all duration-300 flex items-center justify-center text-white font-semibold`}
              >
                JD
              </div>
            </Button>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen(!open)}
            className="lg:hidden h-9 w-9 rounded-full border-gray-300 dark:border-gray-700 
              hover:scale-105 transition-all duration-300 hover:border-purple-300 dark:hover:border-pink-700"
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="space-y-2">
              {links.map((link) => {
                const isActive = isActiveLink(link.href);
                const linkHref = `/${currentLocale}${
                  link.href === "/" ? "" : link.href
                }`;
                return (
                  <a
                    key={link.id}
                    href={linkHref}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 group
                      ${
                        isActive
                          ? `bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 text-purple-600 dark:text-pink-400`
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-pink-400"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`transition-transform duration-300 ${
                          isActive
                            ? "scale-110 text-purple-600 dark:text-pink-400"
                            : ""
                        }`}
                      >
                        {link.icon}
                      </span>
                      <span className="font-medium">{link.label}</span>
                    </div>
                    <div
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${gradientColors.bg} scale-110`
                          : "bg-gray-300 dark:bg-gray-600 group-hover:bg-purple-400 dark:group-hover:bg-pink-400"
                      }`}
                    />
                  </a>
                );
              })}
              <a
                href="/profile"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-300 group
                  ${
                    pathname === "/profile"
                      ? `bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 text-purple-600 dark:text-pink-400`
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-purple-600 dark:hover:text-pink-400"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Profile</span>
                </div>
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    pathname === "/profile"
                      ? `bg-gradient-to-r ${gradientColors.bg} scale-110`
                      : "bg-gray-300 dark:bg-gray-600 group-hover:bg-purple-400 dark:group-hover:bg-pink-400"
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
