"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
interface SuccessMessageProps {
  onClose: () => void;
}

export default function SuccessMessage({ onClose }: SuccessMessageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const pathname = usePathname(); // ví dụ: /en/create-folder
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // Hiệu ứng confetti với màu purple-pink
    myConfetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#8b5cf6", "#ec4899", "#d946ef", "#a855f7", "#f472b6"],
    });

    // Thêm hiệu ứng thêm sau 300ms
    setTimeout(() => {
      myConfetti({
        particleCount: 50,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ["#8b5cf6", "#a855f7"],
      });
    }, 300);

    // Thêm hiệu ứng từ bên phải
    setTimeout(() => {
      myConfetti({
        particleCount: 50,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ["#ec4899", "#f472b6"],
      });
    }, 600);
  }, []);

  const handleViewNow = () => {
    // Lấy các segment
    const segments = pathname.split("/").filter(Boolean); // ["en", "create-folder"]
    // Thay segment cuối thành "decks"
    segments[segments.length - 1] = "decks";
    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Canvas cho confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-10"
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative z-20 w-full max-w-md"
      >
        <Card className="bg-gradient-to-br from-white to-slate-50 border-2 border-purple-100 shadow-2xl overflow-hidden">
          {/* Header với gradient purple-pink */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 text-center relative overflow-hidden">
            {/* Hiệu ứng bong bóng nền */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white/10"
                  style={{
                    width: `${Math.random() * 60 + 20}px`,
                    height: `${Math.random() * 60 + 20}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float ${
                      Math.random() * 10 + 10
                    }s infinite ease-in-out`,
                    animationDelay: `${i * 2}s`,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4 shadow-lg relative z-10"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-md opacity-50" />
                <svg
                  className="w-10 h-10 text-purple-600 relative"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </motion.div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
                🎉 Thành công!
              </h2>
              <p className="text-purple-100/90 font-medium">
                Folder của bạn đã được tạo thành công
              </p>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-5">
              <div className="text-center">
                <h3 className="font-semibold text-gray-800 text-lg mb-3">
                  Folder đã sẵn sàng để sử dụng!
                </h3>
                <p className="text-gray-600">
                  Bạn có thể truy cập folder từ thư viện học tập của mình.
                </p>
              </div>

              {/* Card mẹo học tập với màu purple */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800 mb-2">
                      Mẹo học tập hiệu quả:
                    </h4>
                    <ul className="text-sm text-purple-700/80 space-y-1.5">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        Ôn tập mỗi ngày
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        Chia nhỏ nội dung học
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        Học nội dung quan trọng trước
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleViewNow}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Xem Folder Ngay
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                >
                  <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  Đóng thông báo
                </Button>
              </div>

              <div className="text-center pt-3">
                <button
                  onClick={onClose}
                  className="text-sm text-gray-500 hover:text-purple-600 inline-flex items-center gap-1.5 transition-colors group"
                ></button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
      `}</style>
    </motion.div>
  );
}
