import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogPortal,
    DialogOverlay,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { int } from 'zod';
import { Flashcard } from '@/components/study/flip-card/flip-card';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { AiOutlineSound } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ZoomProps {
    showDialogZoom: boolean;
    setShowDialogZoom: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSettingsDialog: React.Dispatch<React.SetStateAction<boolean>>;
    flashcard: Flashcard;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
    flipped: boolean;
    setFlipped: React.Dispatch<React.SetStateAction<boolean>>;
    activeStar: { [id: string]: boolean };
    handelStarClick: (id: number) => void;
    setTempImageUrl: React.Dispatch<React.SetStateAction<string>>;
    card: Flashcard[];
    setCard: React.Dispatch<React.SetStateAction<Flashcard[]>>;
    setApi: React.Dispatch<React.SetStateAction<CarouselApi | null>>;
    editingId: number | null;
    setEditingId: React.Dispatch<React.SetStateAction<number | null>>;
    setShowEditDialog: React.Dispatch<React.SetStateAction<boolean>>;
    button: string;
}

export default function Zoom({ showDialogZoom, setShowDialogZoom, setShowSettingsDialog, flashcard, currentIndex, setCurrentIndex, flipped, setFlipped, activeStar, handelStarClick, setTempImageUrl, card, setCard, setApi, editingId, setEditingId, setShowEditDialog, button }: ZoomProps) {
    if (!flashcard) return null;
    return (
        <div>
            <Dialog open={showDialogZoom} onOpenChange={setShowDialogZoom}>
                <DialogPortal>
                    <DialogOverlay className="fixed inset-0 w-screen h-screen bg-black/40" />
                    <DialogContent
                        aria-label="Fullscreen dialog"
                        className="
        fixed inset-0
        translate-x-0 translate-y-0
        max-w-none! max-h-none!
        w-screen h-screen
        rounded-none! p-0 m-0
        overflow-hidden flex flex-col
        bg-background
        [&>button:last-child]:hidden
      "
                    >

                        <VisuallyHidden>
                            <DialogTitle></DialogTitle>
                        </VisuallyHidden>
                        {/* HEADER */}
                        <div
                            className="
        flex items-center justify-between pt-4 px-4 gap-4
        max-sm:flex-col max-sm:items-stretch
    "
                        >

                            {/* DESKTOP LAYOUT */}
                            <div className="flex-1 max-sm:hidden">
                                <Select>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="apple" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* DESKTOP – CENTER */}
                            <div className="flex flex-col items-center font-bold text-center flex-1 max-sm:hidden">
                                <span className="text-lg">12/50</span>
                                <span className="text-sm opacity-80">hello</span>
                            </div>

                            {/* DESKTOP – ICONS */}
                            <div className="flex gap-3 items-center flex-1 justify-end max-sm:hidden">
                                <img
                                    src="/settings.gif"
                                    alt=""
                                    className="w-9 h-9 cursor-pointer dark:invert dark:saturate-0"
                                    onClick={() => setShowSettingsDialog(true)}
                                />

                                <DialogClose asChild>
                                    <img
                                        src="/zoom-out.gif"
                                        alt=""
                                        className="w-9 h-9 cursor-pointer dark:invert dark:saturate-0"
                                    />
                                </DialogClose>
                            </div>
                            <div
                                className="
            hidden max-sm:flex 
            flex-row items-center justify-between 
            w-full gap-3
        "
                            >
                                {/* LEFT: 12/50 */}
                                <span className="text-base font-bold">12/50</span>

                                {/* CENTER: hello (giữa thật sự) */}
                                <span className="text-sm font-bold opacity-80 text-center flex-1">
                                    hello
                                </span>

                                {/* RIGHT: icons */}
                                <div className="flex gap-3 items-center">
                                    <img
                                        src="/settings.gif"
                                        alt=""
                                        className="w-8 h-8 cursor-pointer"
                                        onClick={() => setShowSettingsDialog(true)}
                                    />

                                    <DialogClose asChild>
                                        <img
                                            src="/zoom-out.gif"
                                            alt=""
                                            className="w-8 h-8 cursor-pointer"
                                        />
                                    </DialogClose>
                                </div>
                            </div>

                            {/* MOBILE – SELECT row below */}
                            <div className="hidden max-sm:block w-full">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="apple" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Fruits</SelectLabel>
                                            <SelectItem value="apple">Apple</SelectItem>
                                            <SelectItem value="banana">Banana</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Progress value={33} className="h-0.5 w-full rounded-full" />
                        {/* BODY */}
                        <div className="flex-1 p-4 overflow-auto md:px-40 xl:px-80">
                            <Carousel className="w-full h-[450px] relative" setApi={setApi}>
                                <CarouselContent>
                                    {card.map((flashcard) => {
                                        const imageUrl = flashcard.imageUrl;
                                        return (
                                            <CarouselItem key={flashcard.id}>
                                                <div className="relative h-[450px] cursor-pointer perspective" onClick={() => setFlipped(!flipped)}>
                                                    <div
                                                        className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""
                                                            }`}
                                                    >
                                                        {/* mặt trước */}
                                                        <div
                                                            className="absolute inset-0 backface-hidden flex flex-col gap-4 p-4 shadow-md bg-primary-radiant dark:bg-primary-radiant-dark border rounded-lg justify-between"
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <div className="border dark:border-[#718096] rounded-full p-1">
                                                                    <HiOutlineLightBulb />
                                                                </div>
                                                                <div className="flex gap-4">
                                                                    <span className="border dark:border-[#718096] rounded-full p-1">
                                                                        <AiOutlineSound />
                                                                    </span>
                                                                    <span className="border dark:border-[#718096] rounded-full p-1">
                                                                        <FiEdit onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setEditingId(flashcard.id);
                                                                            setTempImageUrl(flashcard.imageUrl);
                                                                            setShowEditDialog(true);
                                                                        }} />
                                                                    </span>
                                                                    <span className="border dark:border-[#718096] rounded-full p-1" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handelStarClick(flashcard.id);
                                                                    }}>
                                                                        {activeStar[flashcard.id] ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="md:flex md:flex-row md:gap-x-4 space-y-4 h-[90%] md:pb-10 flex flex-col">
                                                                <div className="flex-1 flex items-center justify-center">
                                                                    {flashcard.definition}
                                                                </div>
                                                                <div className={`${imageUrl ? "flex-1" : "hidden"} flex items-center justify-center`}>
                                                                    <img
                                                                        src={imageUrl || undefined}
                                                                        alt="Ảnh"
                                                                        className="aspect-square w-full max-w-[250px] md:max-w-none object-cover rounded-lg md:w-[80%] md:h-[80%]"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* mặt sau */}
                                                        <div
                                                            className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col gap-4 p-4 shadow-md dark:bg-[#2D3748] border rounded-lg justify-between bg-primary-radiant"
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <div className="border dark:border-[#718096] rounded-full p-1">
                                                                    <HiOutlineLightBulb />
                                                                </div>
                                                                <div className="flex gap-4">
                                                                    <span className="border dark:border-[#718096] rounded-full p-1">
                                                                        <AiOutlineSound />
                                                                    </span>
                                                                    <span className="border dark:border-[#718096] rounded-full p-1">
                                                                        <FiEdit onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setTempImageUrl(flashcard.imageUrl);
                                                                            setShowEditDialog(true);
                                                                        }} />
                                                                    </span>
                                                                    <span className="border dark:border-[#718096] rounded-full p-1" onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handelStarClick(flashcard.id);
                                                                    }}>
                                                                        {activeStar[flashcard.id] ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div className="flex h-[90%] gap-x-4">
                                                                <div className="flex-1 flex items-center justify-center pb-10 px-4 text-center">
                                                                    <p className="opacity-90">
                                                                        {flashcard.term}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                        )
                                    })}
                                </CarouselContent>
                                <div className="py-8 flex justify-between items-center gap-4 flex-wrap">
                                    <button className={`${button} whitespace-nowrap border border-gray-300`}>
                                        Dễ
                                    </button>

                                    <button className={`${button} whitespace-nowrap border border-gray-300`}>
                                        Trung bình
                                    </button>

                                    <button className={`${button} whitespace-nowrap border border-gray-300`}>
                                        Khó
                                    </button>

                                    <button className={`${button} whitespace-nowrap border border-gray-300`}>
                                        Rất khó
                                    </button>
                                </div>

                                <div className="flex justify-between gap-4 mt-4">
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <Label htmlFor="airplane-mode">Theo dõi tiến độ</Label>
                                            <Switch id="airplane-mode" />
                                        </div>
                                    </div>
                                    <div className='flex'>
                                        <span><img src="/play-1.gif" alt="" className='w-10 h-10 dark:invert dark:saturate-0' /></span>
                                        <span><img src="/shuffle-1.gif" alt="" className='w-10 h-10 dark:invert dark:saturate-0' /></span>
                                    </div>
                                </div>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </div>
    )
}
