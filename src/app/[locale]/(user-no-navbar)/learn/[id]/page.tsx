'use client'

import React, { useState, useEffect } from 'react'
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { HiOutlineLightBulb } from "react-icons/hi2";
import { AiOutlineSound } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useRouter, useParams } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import FlashcardEdit from '@/components/dialog/flashcard-edit/flashcard-edit';
import FlashcardSettingDialog from '@/components/dialog/flashcard-setting-dialog/flashcard-setting-dialog';

interface Flashcard {
    id: number;
    term: string;
    definition: string;
    imageUrl: string;
}

export default function StudyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [value, setValue] = useState("")
    const [flipped, setFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi | null>(null);
    const [activeStar, setActiveStar] = useState<{ [id: string]: boolean }>({});
    const [showSettingsDialog, setShowSettingsDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [tempImageUrl, setTempImageUrl] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    // Load data từ localStorage hoặc fetch từ API dựa trên id
    const [card, setCard] = useState<Flashcard[]>([]);

    useEffect(() => {
        // Cách 1: Lấy từ localStorage (tạm thời)
        const savedData = localStorage.getItem('learn-flashcards');
        if (savedData) {
            const data = JSON.parse(savedData);
            setCard(data);
            // localStorage.removeItem('learn-flashcards'); // Xóa sau khi dùng
        } else {
            // Cách 2: Fetch từ API dựa trên id
            // TODO: Fetch data từ API
            // fetchFlashcards(id).then(data => setCard(data));

            // Data mẫu nếu không có
            setCard([
                { id: 1, term: "Term 1", definition: "Definition 1", imageUrl: "" },
                { id: 2, term: "Term 2", definition: "Definition 2", imageUrl: "" },
            ]);
        }
    }, [id]);

    const handelStarClick = (id: number) => {
        setActiveStar(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const speakEnglishUS = (text: string): void => {
        const synth = window.speechSynthesis;
        const speak = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            const voices = synth.getVoices();
            const femaleUS = voices.find(v =>
                v.lang === "en-US" &&
                /female|zira|samantha|google us english/i.test(v.name)
            );
            if (femaleUS) {
                utterance.voice = femaleUS;
            }
            synth.speak(utterance);
        };
        if (synth.getVoices().length === 0) {
            synth.onvoiceschanged = speak;
        } else {
            speak();
        }
    };

    useEffect(() => {
        if (!api) return;
        const handleSelect = () => {
            setFlipped(false);
            setCurrentIndex(api.selectedScrollSnap());
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                api.scrollPrev()
            }
            if (e.key === "ArrowRight") {
                api.scrollNext()
            }
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                e.preventDefault()
                setFlipped((prev) => !prev)
            }
            if (e.key === " ") {
                e.preventDefault()
                setFlipped((prev) => !prev)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        api.on("select", handleSelect);
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            api.off("select", handleSelect);
        };
    }, [api])

    const buttonClass = "flex flex-1 justify-center items-center px-4 py-2 rounded-md border transition duration-200 bg-white text-black border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transform hover:-translate-y-1 dark:bg-[#0F172B] dark:text-white dark:border-slate-400 dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)]";

    if (card.length === 0) {
        return (
            <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-background">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 w-screen h-screen overflow-hidden flex flex-col bg-background">
            {/* HEADER */}
            <div className="flex items-center justify-between pt-4 px-4 gap-4 max-sm:flex-col max-sm:items-stretch">
                {/* DESKTOP LAYOUT */}
                <div className="flex-1 max-sm:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[180px] justify-between">
                                <span>Learn</span>
                                <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Feature</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push(`/test`)}>Test</DropdownMenuItem>
                            <DropdownMenuItem>Match</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* DESKTOP – CENTER */}
                <div className="flex flex-col items-center font-bold text-center flex-1 max-sm:hidden">
                    <span className="text-lg">{currentIndex + 1}/{card.length}</span>
                    <span className="text-sm opacity-80">Learn Mode</span>
                </div>

                {/* DESKTOP – ICONS */}
                <div className="flex gap-3 items-center flex-1 justify-end max-sm:hidden">
                    <img
                        src="/settings.gif"
                        alt=""
                        className="w-9 h-9 cursor-pointer dark:invert dark:saturate-0"
                        onClick={() => setShowSettingsDialog(!showSettingsDialog)}
                    />
                    <X
                        className="w-9 h-9 cursor-pointer p-1 hover:bg-accent rounded-md transition-colors"
                        onClick={() => router.back()}
                    />
                </div>

                {/* MOBILE LAYOUT */}
                <div className="hidden max-sm:flex flex-row items-center justify-between w-full gap-3">
                    <span className="text-base font-bold">{currentIndex + 1}/{card.length}</span>
                    <span className="text-sm font-bold opacity-80 text-center flex-1">Learn Mode</span>
                    <div className="flex gap-3 items-center">
                        <img
                            src="/settings.gif"
                            alt=""
                            className="w-8 h-8 cursor-pointer dark:invert dark:saturate-0"
                            onClick={() => setShowSettingsDialog(!showSettingsDialog)}
                        />
                        <X
                            className="w-8 h-8 cursor-pointer"
                            onClick={() => router.back()}
                        />
                    </div>
                </div>

                {/* MOBILE – SELECT */}
                <div className="hidden max-sm:block w-full">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Flashcard" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Feature</SelectLabel>
                                <SelectItem value="learn">Learn</SelectItem>
                                <SelectItem value="test">Test</SelectItem>
                                <SelectItem value="match">Match</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Progress value={(currentIndex + 1) / card.length * 100} className="h-0.5 my-4 w-full rounded-full" />

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
                                            className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""}`}
                                        >
                                            {/* mặt trước */}
                                            <div className="absolute inset-0 backface-hidden flex flex-col gap-4 p-4 shadow-md bg-primary-radiant dark:bg-primary-radiant-dark border rounded-lg justify-between">
                                                <div className="flex justify-between items-center">
                                                    <div className="border dark:border-[#718096] rounded-full p-1">
                                                        <HiOutlineLightBulb />
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="border dark:border-[#718096] rounded-full p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                speakEnglishUS(flashcard.definition);
                                                            }}
                                                        >
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
                                                    <div className="flex-1 flex items-center justify-center text-xl">
                                                        {flashcard.definition}
                                                    </div>
                                                    <div className={`${imageUrl ? "flex-1" : "hidden"} flex items-center justify-center`}>
                                                        <img
                                                            src={imageUrl || undefined}
                                                            alt="Ảnh"
                                                            className="w-full max-w-[250px] md:max-w-none h-auto md:object-cover object-contain rounded-lg md:w-[80%] md:h-[80%]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* mặt sau */}
                                            <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col gap-4 p-4 shadow-md dark:bg-[#2D3748] border rounded-lg justify-between bg-primary-radiant">
                                                <div className="flex justify-between items-center">
                                                    <div className="border dark:border-[#718096] rounded-full p-1">
                                                        <HiOutlineLightBulb />
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <span className="border dark:border-[#718096] rounded-full p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                speakEnglishUS(flashcard.term);
                                                            }}
                                                        >
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

                                                <div className="flex h-[90%] gap-x-4">
                                                    <div className="flex-1 flex items-center justify-center pb-10 px-4 text-center text-xl">
                                                        <p className="opacity-90">{flashcard.term}</p>
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
                        <button className={`${buttonClass} whitespace-nowrap cursor-pointer`}>
                            Dễ
                        </button>
                        <button className={`${buttonClass} whitespace-nowrap cursor-pointer`}>
                            Trung bình
                        </button>
                        <button className={`${buttonClass} whitespace-nowrap cursor-pointer`}>
                            Khó
                        </button>
                        <button className={`${buttonClass} whitespace-nowrap cursor-pointer`}>
                            Rất khó
                        </button>
                    </div>

                    <div className="flex justify-between gap-4 mt-4">
                        <div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="track-progress">Theo dõi tiến độ</Label>
                                <Switch id="track-progress" />
                            </div>
                        </div>
                        <div className='flex cursor-pointer gap-2'>
                            <img src="/play-1.gif" alt="" className='w-10 h-10 dark:invert dark:saturate-0' />
                            <img src="/shuffle-1.gif" alt="" className='w-10 h-10 dark:invert dark:saturate-0' />
                        </div>
                    </div>

                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

            <FlashcardEdit
                showEditDialog={showEditDialog}
                onOpenChange={setShowEditDialog}
                card={card}
                setCard={setCard}
                tempImageUrl={tempImageUrl}
                setTempImageUrl={setTempImageUrl}
                onSave={(newImageUrl) => {
                    if (!editingId) return;
                    setCard(prev =>
                        prev.map(c =>
                            c.id === editingId
                                ? { ...c, imageUrl: newImageUrl }
                                : c
                        )
                    );
                    setShowEditDialog(false);
                }}
            />

            <FlashcardSettingDialog
                showSettingsDialog={showSettingsDialog}
                onOpenChange={setShowSettingsDialog}
                value={value}
                setValue={setValue}
                showCommentOption={true}
            />
        </div>
    )
}
