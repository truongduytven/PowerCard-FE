import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, AlertCircle } from "lucide-react";
import { FormData } from "@/types/create-folder";

interface FolderFormProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export default function FolderForm({
  formData,
  handleInputChange,
}: FolderFormProps) {
  const [titleError, setTitleError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");

  const handleTitleChange = (value: string) => {
    // Reset error khi bắt đầu gõ
    if (titleError) setTitleError("");

    // Kiểm tra và giới hạn 60 ký tự
    if (value.length <= 60) {
      handleInputChange("title", value);
    } else {
      // Hiển thị thông báo lỗi khi vượt quá
      setTitleError("Tên folder không được vượt quá 60 ký tự");
      // Vẫn cập nhật nhưng cắt bớt
      handleInputChange("title", value.slice(0, 60));

      // Hiển thị toast hoặc feedback tùy chọn
      // Bạn có thể tích hợp toast ở đây nếu muốn
    }
  };

  const handleDescriptionChange = (value: string) => {
    // Reset error khi bắt đầu gõ
    if (descriptionError) setDescriptionError("");

    // Kiểm tra và giới hạn 200 ký tự
    if (value.length <= 200) {
      handleInputChange("description", value);
    } else {
      // Hiển thị thông báo lỗi khi vượt quá
      setDescriptionError("Mô tả không được vượt quá 200 ký tự");
      // Vẫn cập nhật nhưng cắt bớt
      handleInputChange("description", value.slice(0, 200));
    }
  };

  // Hàm clear error khi focus vào input
  const handleTitleFocus = () => {
    if (titleError) setTitleError("");
  };

  const handleDescriptionFocus = () => {
    if (descriptionError) setDescriptionError("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl">Thông Tin Folder</CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-gray-400 hover:text-blue-600 transition-colors">
                <HelpCircle className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs">
              <p className="text-sm">
                Hãy đặt tên cho folder, mô tả mục tiêu học và chọn các bộ
                flashcard cùng chủ đề để dễ ôn tập và quản lý.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <CardDescription>Đặt tên và mô tả cho folder của bạn</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="title" className="text-sm font-medium">
              Tên Folder <span className="text-red-500">*</span>
            </Label>
            <span
              className={`text-xs ${
                formData.title.length >= 55
                  ? "text-red-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {formData.title.length}/60
            </span>
          </div>
          <Input
            id="title"
            placeholder="Ví dụ: Ôn thi TOEIC 800+"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            onFocus={handleTitleFocus}
            maxLength={60}
            className={`h-11 ${
              titleError ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
          {titleError && (
            <div className="flex items-center gap-1 text-red-500 text-sm animate-in fade-in duration-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{titleError}</span>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="description" className="text-sm font-medium">
              Mô Tả
            </Label>
            <span
              className={`text-xs ${
                formData.description.length >= 180
                  ? "text-red-500 font-semibold"
                  : "text-gray-500"
              }`}
            >
              {formData.description.length}/200
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="Mô tả nội dung, mục tiêu học tập..."
            value={formData.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            onFocus={handleDescriptionFocus}
            maxLength={200}
            className={`min-h-[100px] resize-none ${
              descriptionError
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
          {descriptionError && (
            <div className="flex items-center gap-1 text-red-500 text-sm animate-in fade-in duration-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{descriptionError}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
