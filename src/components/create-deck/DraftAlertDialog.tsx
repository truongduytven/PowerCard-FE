import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DraftAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestore: () => void;
  onCreateNew: () => void;
}

export const DraftAlertDialog: React.FC<DraftAlertDialogProps> = ({
  open,
  onOpenChange,
  onRestore,
  onCreateNew,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tìm thấy bản nháp chưa lưu</AlertDialogTitle>
          <AlertDialogDescription>
            Chúng tôi tìm thấy một bản nháp trước đó. Bạn muốn tiếp tục với bản
            nháp này hay tạo mới?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCreateNew}>Tạo mới</AlertDialogCancel>
          <AlertDialogAction onClick={onRestore}>
            Tiếp tục với bản nháp
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
