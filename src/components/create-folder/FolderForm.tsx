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
import { HelpCircle } from "lucide-react";
import { FormData } from "@/types/create-folder";

interface FolderFormProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string) => void;
}

export default function FolderForm({
  formData,
  handleInputChange,
}: FolderFormProps) {
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
            <span className="text-xs text-gray-500">
              {formData.title.length}/60
            </span>
          </div>
          <Input
            id="title"
            placeholder="Ví dụ: Ôn thi TOEIC 800+"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            maxLength={60}
            className="h-11"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label htmlFor="description" className="text-sm font-medium">
              Mô Tả
            </Label>
            <span className="text-xs text-gray-500">
              {formData.description.length}/200
            </span>
          </div>
          <Textarea
            id="description"
            placeholder="Mô tả nội dung, mục tiêu học tập..."
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            maxLength={200}
            className="min-h-[100px] resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}
