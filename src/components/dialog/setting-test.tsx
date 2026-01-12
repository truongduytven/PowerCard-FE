import React, { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { GiSettingsKnobs } from "react-icons/gi";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface TestSettingsDialogProps {
    showSettingsDialog: boolean;
    onOpenChange: (open: boolean) => void;

    value: string;
    setValue: (v: string) => void;
}

export default function SettingTest({ showSettingsDialog,
    onOpenChange,
    value,
    setValue, }: TestSettingsDialogProps) {

    const [questionCount, setQuestionCount] = useState(20);
    const MIN = 1
    const MAX = 100

    const percent =
        ((questionCount - MIN) / (MAX - MIN)) * 100;

    return (
        <>
            <Dialog open={showSettingsDialog} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[800px] [&>button:last-child]:hidden">
                    <DialogClose asChild>
                        <button
                            onClick={() => {
                                setValue("");
                            }}
                            className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                        >
                            <XIcon />
                        </button>
                    </DialogClose>

                    <DialogHeader className="px-6 pt-6 pb-4 border-b">
                        <DialogTitle className="text-lg font-semibold flex items-center gap-x-2">
                            <GiSettingsKnobs className='text-[#E3399E]' />
                            Cài đặt Bài Quiz Flashcard
                        </DialogTitle>
                    </DialogHeader>

                    <div className="px-6 py-4 space-y-6">
                        <div className="relative">
                            <Slider
                                value={[questionCount]}
                                onValueChange={(value) => setQuestionCount(value[0])}
                                min={MIN}
                                max={MAX}
                                step={1}
                            />

                            <div
                                className="absolute -top-7 text-xs bg-primary text-white px-2 py-0.5 rounded-md whitespace-nowrap"
                                style={{
                                    left: `calc(${percent}% )`,
                                    transform: "translateX(-50%)",
                                }}
                            >
                                {questionCount}
                            </div>

                            <div className="flex justify-between text-xs text-gray-400">
                                <span>{MIN}</span>
                                <span>{MAX}</span>
                            </div>
                        </div>


                        <div className="flex justify-between items-center">
                            <span className="font-medium">Chỉ làm thuật ngữ có đính sao</span>
                            <span>
                                <Switch defaultChecked />
                            </span>
                        </div>

                        <div className="space-y-4">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full"
                            >
                                <AccordionItem value="question-format" className="border-none">
                                    <AccordionTrigger className="group hover:no-underline">
                                        <div className="flex w-full items-center justify-between">
                                            <span className="font-medium text-base">
                                                Định dạng câu hỏi
                                            </span>
                                            <div className="flex items-center text-sm text-muted-foreground cursor-pointer">
                                                <span className="group-data-[state=open]:hidden">
                                                    Hiện
                                                </span>
                                                <span className="hidden group-data-[state=open]:inline">
                                                    Ẩn
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className="px-4 pb-4 space-y-3">
                                        <div className="flex justify-between items-center border rounded-full bg-primary/5 px-4 py-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">
                                                    Câu hỏi là định nghĩa
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Hiển thị định nghĩa làm câu hỏi, chọn thuật ngữ tương ứng
                                                </span>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <div className="flex justify-between items-center border rounded-full bg-primary/5 px-4 py-2">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">
                                                    Câu hỏi là thuật ngữ
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    Hiển thị thuật ngữ làm câu hỏi, chọn định nghĩa phù hợp
                                                </span>
                                            </div>
                                            <Switch />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>

                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Start Quiz</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
