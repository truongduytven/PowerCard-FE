import React from "react";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";
import { toast } from "sonner";

interface KeyboardShortcutsHelperProps {
  className?: string;
}

export const KeyboardShortcutsHelper: React.FC<
  KeyboardShortcutsHelperProps
> = ({ className = "" }) => {
  const showShortcuts = () => {
    toast("Phím tắt: Ctrl+S (Lưu), Ctrl+Enter (Thêm thẻ), Ctrl+Z (Hoàn tác)", {
      duration: 5000,
      position: "bottom-right",
    });
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Button
        variant="outline"
        size="sm"
        className="bg-white/90 backdrop-blur-sm shadow border-gray-300/80 hover:bg-white h-9"
        onClick={showShortcuts}
        title="Xem phím tắt"
      >
        <Keyboard className="w-3.5 h-3.5 mr-1.5" />
        Phím tắt
      </Button>
    </div>
  );
};
