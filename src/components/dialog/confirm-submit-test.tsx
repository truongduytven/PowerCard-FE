import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ConfirmSubmitTestProps {
    showConfirmDialog: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    onContinue: () => void;
    selectedAnswersCount: number;
    totalQuestionsCount: number;
}
export default function ConfirmSubmitTest({ showConfirmDialog, onOpenChange, onConfirm, onContinue, selectedAnswersCount, totalQuestionsCount }: ConfirmSubmitTestProps) {
    return (
        <>
            <Dialog open={showConfirmDialog} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Chưa hoàn thành hết câu hỏi</DialogTitle>
                        <DialogDescription>
                            Bạn chỉ trả lời {selectedAnswersCount}/{totalQuestionsCount} câu hỏi.
                            Bạn có chắc chắn muốn nộp bài không?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-x-2">
                        <Button
                            variant="outline"
                            onClick={onContinue}
                        >
                            Tiếp tục làm bài
                        </Button>
                        <Button
                            onClick={onConfirm}
                            className="bg-pink-400 hover:bg-pink-500"
                        >
                            Nộp bài
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
