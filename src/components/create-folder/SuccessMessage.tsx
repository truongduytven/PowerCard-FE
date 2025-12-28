import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-green-900 text-base md:text-lg">
                🎉 Folder đã được tạo thành công!
              </h3>
              <p className="text-green-700 text-sm md:text-base">
                Bạn có thể xem folder trong thư viện học tập.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 whitespace-nowrap"
            >
              Xem ngay
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
