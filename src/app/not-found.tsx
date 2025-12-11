"use client";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { geistSans, geistMono } from "./fonts";
import "./[locale]/globals.css";

export default function NotFound() {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <h1 className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-none animate-pulse">
                404
              </h1>
            </div>

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-full shadow-xl">
                  <Search className="h-16 w-16 text-purple-500" />
                </div>
              </div>
            </div>

            {/* Message */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Không Tìm Thấy Trang
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
            </p>

            {/* Suggestions */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Có thể bạn đang tìm:
              </p>
              <ul className="space-y-2 text-left max-w-sm mx-auto">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="h-1.5 w-1.5 bg-purple-400 rounded-full"></span>
                  Kiểm tra lại URL có đúng không
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="h-1.5 w-1.5 bg-purple-400 rounded-full"></span>
                  Quay về trang chủ
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="h-1.5 w-1.5 bg-purple-400 rounded-full"></span>
                  Sử dụng thanh tìm kiếm
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/vi/home"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Home className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Về Trang Chủ
              </Link>

              <button
                onClick={() => window.history.back()}
                className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                Quay Lại
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="mt-12 flex justify-center gap-2">
              <div className="h-2 w-2 bg-pink-400 rounded-full animate-bounce"></div>
              <div className="h-2 w-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
