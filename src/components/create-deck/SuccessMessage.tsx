import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessMessageProps {
  show: boolean;
  title: string;
  onClose: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
  show,
  title,
  onClose,
}) => {
  if (!show) return null;

  return (
    <div className="mb-5 animate-in fade-in slide-in-from-top duration-300">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50/80 border border-green-200 rounded-xl p-4 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow">
            <Check className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-900">Tạo thành công!</h3>
            <p className="text-sm text-green-700/90 mt-0.5">
              Bộ flashcard "<span className="font-medium">{title}</span>" đã
              được tạo.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-green-300/80 text-green-700 hover:bg-green-50/80 h-8"
            onClick={onClose}
          >
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
};
