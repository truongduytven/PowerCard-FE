"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu as MenuIcon, X } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/Logo.png";
export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    ["/", "Home"],
    ["decks", "Decks"],
    ["create", "Create"],
    ["study", "Study"],
    ["profile", "Profile"],
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b overflow-x-hidden">
      <div className="container-6xl flex h-16 items-center justify-between px-4 md:px-20">
        <a
          href="/"
          className="hover:opacity-80 transition-opacity duration-200 h-16 flex items-center"
        >
          <Image
            src={logo}
            alt="FlashLearn Logo"
            width={0}
            height={64}
            className="h-full object-contain"
          />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={`${href}`}
              className="hover:opacity-80 transition-all duration-200 hover:scale-105"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:scale-105 transition-transform transform-gpu"
          >
            <Sun className="h-4 w-4 dark:hidden" />
            <Moon className="h-4 w-4 hidden dark:block" />
          </Button>

          <Button
            className="md:hidden hover:scale-105 transition-transform duration-200"
            variant="outline"
            size="sm"
            onClick={() => setOpen(!open)}
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
        <div
          className={`md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container-6xl py-3 flex flex-col gap-3 text-sm px-4">
            {links.map(([href, label]) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={() => setOpen(false)} // khi click item sẽ đóng menu
                className="rounded-full border px-3 py-2 hover:bg-muted transition-all duration-200 hover:scale-105 text-center"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
