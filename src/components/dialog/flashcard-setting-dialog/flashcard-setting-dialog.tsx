import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { XIcon } from 'lucide-react'
import { GiSettingsKnobs } from "react-icons/gi";
import { Switch } from "@/components/ui/switch"
import { Button } from '../../ui/button'

interface FlashcardSettingsDialogProps {
    showSettingsDialog: boolean;
    onOpenChange: (open: boolean) => void;

    value: string;
    setValue: (v: string) => void;
}

export default function FlashcardSettingDialog({
    showSettingsDialog,
    onOpenChange,
    value,
    setValue,
}: FlashcardSettingsDialogProps) {
    return (
        <>
            <Dialog open={showSettingsDialog} onOpenChange={onOpenChange}>
                <form>
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
                        <DialogHeader>
                            <DialogTitle className='flex gap-x-2'><GiSettingsKnobs className='text-[#E3399E]' />Flashcard Settings</DialogTitle>
                        </DialogHeader>
                        <div>
                            <div className='space-y-2 mb-6'>
                                <h1 className='font-bold'>Cài đặt phiên học</h1>
                                <hr />
                                <h1 className='w-1/2 font-medium'>Khoảng thời gian lặp lại</h1>

                                <div className='flex justify-between items-center'>
                                    <div className='space-y-1.5'>
                                        <div className='flex gap-x-0.5'>
                                            <Label htmlFor="easy">Easy</Label>
                                            <span>(minutes)</span>
                                        </div>
                                        <Input type="number" id="easy" placeholder="Easy" />
                                    </div>
                                    <div className='space-y-1.5'>
                                        <div className='flex gap-x-0.5'>
                                            <Label htmlFor="medium">Medium</Label>
                                            <span>(minutes)</span>
                                        </div>
                                        <Input type="number" id="medium" placeholder="Medium" />
                                    </div>
                                    <div className='space-y-1.5'>
                                        <div className='flex gap-x-0.5'>
                                            <Label htmlFor="hard">Hard</Label>
                                            <span>(minutes)</span>
                                        </div>
                                        <Input type="number" id="hard" placeholder="Hard" />
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <h1>Font</h1>
                                    <div className='relative'>
                                        <label
                                            className={`
          absolute left-3 pointer-events-none text-gray-500 transition-all
          ${value ? "top-1 text-xs" : "top-2 text-sm"}
        `}
                                        >
                                            Select a front
                                        </label>
                                        <Select onValueChange={setValue}>
                                            <SelectTrigger className={`w-[184px] transition-all ${value ? "pt-7 pb-4" : "pt-3 pb-3"}`}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="apple">Term</SelectItem>
                                                    <SelectItem value="banana">Definition</SelectItem>

                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <h1 className="font-bold">Tùy chọn bổ sung</h1>
                                <hr />
                                <div className='flex justify-between items-center'>
                                    <span className='font-medium'>Chỉ học thuật ngữ có đánh dấu sao</span>
                                    <span><Switch /></span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>Âm thanh</span>
                                        <span className='text-[#64748B]'>Tự động phát âm thanh khi hiển thị thẻ</span>
                                    </div>
                                    <div><Switch /></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='flex flex-col'>
                                        <span className='font-medium'>Gợi ý</span>
                                        <span className='text-[#64748B]'>Hiển thị gợi ý cho các thẻ khó</span>
                                    </div>
                                    <div><Switch /></div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span className='font-medium text-red-600 cursor-pointer hover:opacity-60'>Khởi động lại thẻ nhớ</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => setValue("")}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}
