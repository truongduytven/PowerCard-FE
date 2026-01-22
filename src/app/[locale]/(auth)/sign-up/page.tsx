"use client";
import { SignUpForm } from "@/components/forms/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background relative overflow-hidden">
      <div className="absolute -left-30 -top-30 w-[380px] h-[380px] bg-[oklch(0.68_0.21_280)] rounded-full blur-[150px] opacity-100"></div>

      <div className="absolute -bottom-30 -right-30 w-[380px] h-[380px] bg-[oklch(0.82_0.19_10)] rounded-full blur-[150px] opacity-100"></div>

      <div className="w-full max-w-sm shadow-lg rounded-lg">
        <SignUpForm />
      </div>
    </div>
  );
}
