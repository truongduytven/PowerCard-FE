"use client";

import { Sparkles } from "lucide-react";

interface StartStudyCTAProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onStart?: () => void;
}

export function CTABox({
  title = "Ready to learn?",
  description = "Start a focused study session with your current decks",
  buttonText = "Start Study Session",
  onStart,
}: StartStudyCTAProps) {
  return (
    <div className="relative bg-gradient-to-br from-fuchsia-600 to-violet-600 rounded-2xl p-6 hover:shadow-2xl hover:shadow-fuchsia-500/40 transition-all duration-300 overflow-hidden group">
      {/* Animated shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Floating particles */}
      <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping" />
      <div
        className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"
        style={{ animationDelay: "0.5s" }}
      />

      <div className="relative">
        <h3 className="font-bold text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 animate-pulse" />
          {title}
        </h3>

        <p className="text-sm text-fuchsia-100 mb-5">
          {description}
        </p>

        <button
          onClick={onStart}
          className="w-full py-3 bg-white hover:bg-gray-50 text-fuchsia-600 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
