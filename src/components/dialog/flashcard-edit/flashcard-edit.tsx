import React from 'react'
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
import { IoCloseOutline } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { Flashcard } from '@/components/study/flip-card/flip-card';

interface FlashcardEditProps {
    showEditDialog: boolean;
    onOpenChange: (open: boolean) => void;
    tempImageUrl: string;
    setTempImageUrl: (url: string) => void;
    card: Flashcard[];
    setCard: (card: Flashcard[]) => void;
    onSave: (newImageUrl: string) => void;
}

export default function FlashcardEdit(
    {
        showEditDialog,
        onOpenChange,
        tempImageUrl,
        setTempImageUrl,
        onSave
    }: FlashcardEditProps
) {
    return (
        <>
            <Dialog open={showEditDialog} onOpenChange={onOpenChange}>
                <form>
                    <DialogTrigger asChild>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Infor Card</DialogTitle>
                            <DialogDescription>
                                Make changes to your card here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <div className="grid gap-3">
                                    <Label htmlFor="username-1">Term</Label>
                                    <Input id="username-1" name="username" defaultValue="peduarte" />
                                </div>
                                <Label htmlFor="name-1">Definition</Label>
                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Image</Label>
                                <div className="relative w-fit mx-auto">
                                    {tempImageUrl ? (
                                        <>
                                            <label className="cursor-pointer">
                                                <img
                                                    src={tempImageUrl || ""}
                                                    alt="Ảnh"
                                                    className="w-40 h-40 rounded-md"
                                                />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = URL.createObjectURL(file);
                                                            setTempImageUrl(url);
                                                        }
                                                    }}
                                                />
                                            </label>
                                            <IoCloseOutline
                                                className="w-8 h-8 absolute -top-2 -right-1 border shadow-md p-1 rounded-sm
    dark:bg-[#2d3748bf] dark:border-none text-[#E02494] bg-white"
                                                onClick={() => {
                                                    setTempImageUrl("");
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label>
                                                <div className="border-2 border-dashed w-40 h-40 rounded-md flex items-center justify-center cursor-pointer">
                                                    <img src="/upload.gif" className="w-8 h-8 dark:invert dark:saturate-0" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const url = URL.createObjectURL(file);
                                                                setTempImageUrl(url);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </label>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" onClick={() => {
                                onSave(tempImageUrl);
                            }}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    )
}
