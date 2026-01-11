"use client";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { geistSans, geistMono } from "./fonts";
import "./[locale]/globals.css";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-linear-to-br from-gray-900 to-purple-950 text-white">
          <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
            rel="stylesheet"
          />
          <main className="flex items-center justify-center h-screen px-4">
            <div className="relative max-w-5xl w-full flex flex-col lg:flex-row justify-center items-center gap-12 z-10">
              {/* Decorative card */}
              <div className="absolute origin-center rotate-10 right-30 bottom-35 w-[100px] h-[150px] rounded-3xl z-0 bg-white/10" />

              {/* Right section */}
              <div className="flex-1 relative">
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-linear-to-br from-purple-900/30 to-pink-900/20 rounded-3xl blur-xl" />

                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSO0qIKHGrTBcwlRviqjuu3AP00j4zyt1BOSbtqNF4Nh3vqcubo6lJWQ6XaMAYyLhfqdjlaGiPB-qri2mZnQeflHQs5ku31P0yHBjZol8B81ikScNisfQyhTyOGc2f_pd3FZIoqUVYgAA9TyiC1U-KVzQ5zM4W5Yq3XOZNehnqKlvBukkpmvWiQM9Wd8BLcO15QEtYXztAwSeKOvW1X1ZG5JUwcANVncLQNYNUxsJcMnrSQCdyAqTwxKNojkV7Sc3RkiTLI2UzloQ"
                    alt="404"
                    className="absolute inset-0 rounded-2xl w-full h-full object-cover opacity-80"
                  />

                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div
                      className="animate-bounce origin-center -rotate-5 relative w-56 h-72 bg-[#2E1D37] rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center border border-white/10 animate-float group"
                      style={{ animationDuration: "4s" }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-purple-600/30 to-pink-600/20 opacity-30 blur-sm group-hover:opacity-50 transition-opacity duration-500" />

                      <div className="relative z-10 w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(168,85,247,0.35)] border border-primary/30">
                        <span className="material-symbols-outlined text-5xl text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.9)]">
                          <img
                            src="/sad.png"
                            alt=""
                            className="filter brightness-0 invert"
                          />
                        </span>
                      </div>

                      <div className="relative z-10 w-32 h-2 bg-white/10 rounded-full mb-2" />
                      <div className="relative z-10 w-24 h-2 bg-white/10 rounded-full mb-2" />
                      <div className="relative z-10 w-28 h-2 bg-white/10 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Left section */}
              <div className="flex-1 text-center lg:text-left z-10">
                <div className="mb-6">
                  <div className="text-9xl font-black bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    404
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    Oops! Page Not Found
                  </h2>

                  <p className="text-gray-400 text-lg mb-8">
                    The flashcard you're looking for seems to have disappeared.
                    Let's get you back on track.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <img src="/home.gif" alt="" className="w-6 h-6 cursor-pointer invert saturate-0" />
                    Back to Home
                  </Link>

                  <div
                    className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-medium border border-gray-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    onClick={() => router.back()}
                  >
                    <img src="/back.gif" alt="" className="w-6 h-6 invert saturate-0" />
                    Return
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
