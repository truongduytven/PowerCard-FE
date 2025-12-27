"use client";

import { useEffect, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { AiOutlineSound } from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FiEdit } from "react-icons/fi";
import FlashcardEdit from "../../dialog/flashcard-edit/flashcard-edit";
import Zoom from "@/components/dialog/zoom/zoom";
import { FiShare2 } from "react-icons/fi";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import Share from "@/components/dialog/share";
export interface Flashcard {
  id: number;
  definition: string;
  term: string;
  imageUrl: string;
}
interface FlipCardProps {
  flashcards: Flashcard[];
  activeStar: { [id: string]: boolean };
  showSettingsDialog: boolean;
  setShowSettingsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handelStarClick: (id: number) => void;
}

export default function FlipCard({ flashcards, activeStar, showSettingsDialog, setShowSettingsDialog, handelStarClick }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDialogZoom, setShowDialogZoom] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [card, setCard] = useState<Flashcard[]>(flashcards);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [sharedDialog, setSharedDialog] = useState(false);
  const [showHint, setShowHint] = useState<{ [id: number]: boolean }>({});

  const button = `flex justify-center items-center px-4 py-2 rounded-md border transition duration-200 bg-white text-black border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transform hover:-translate-y-1 dark:bg-[#0F172B] dark:text-white dark:border-slate-400 dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] cursor-pointer`

  const generateHint = (term: string): string => {
    const words = term.trim().split(/\s+/);
    // Nhiều từ
    if (words.length > 1) {
      return words
        .map((word) => {
          if (word.length === 1) {
            return "_";
          }

          if (word.length === 2) {
            return word[0] + "_ ";
          }

          if (word.length === 3) {
            return word[0] + "_ ";
          }

          // >= 4 ký tự
          return word.slice(0, 2) + "_ ".repeat(word.length - 2);
        })
        .join(" ");
    }

    // 1 từ
    const word = words[0];

    if (word.length === 1) {
      return "";
    }

    if (word.length === 2) {
      return word[0] + "_ ";
    }

    const middle = "_ ".repeat(word.length - 2);
    return word[0] + middle + word[word.length - 1];
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
    setCurrentIndex(api.selectedScrollSnap());
    api.on("select", handleSelect);
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      api.off("select", handleSelect);
      setCurrentIndex(api.selectedScrollSnap());
    };
  }, [api])

  return (
    <>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {card.map((flashcard) => {
            const imageUrl = flashcard.imageUrl;
            const hint = generateHint(flashcard.term);
            return (
              <CarouselItem key={flashcard.id}>
                <div className="relative h-[450px] cursor-pointer perspective" onClick={() => setFlipped(!flipped)}>
                  <div
                    className={`absolute inset-0 transition-transform duration-500 transform-style-preserve-3d ${flipped ? "rotate-y-180" : ""
                      }`}
                  >
                    {/* mặt trước */}
                    <div
                      className="absolute inset-0 backface-hidden flex flex-col gap-4 p-4 bg-primary-radiant dark:bg-primary-radiant-dark border-gray-200 dark:border-gray-700 rounded-lg justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <div
                          className="min-h-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!hint) return;
                            setShowHint(prev => ({ ...prev, [flashcard.id]: !prev[flashcard.id] }));
                          }}
                        >
                          {hint ? (
                            showHint[flashcard.id] ? (
                              <div className="flex items-center gap-2 border dark:border-primary rounded-full px-4 py-1">
                                <HiOutlineLightBulb />
                                {hint}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 px-4 py-1">
                                <HiOutlineLightBulb />
                                Hiển thị gợi ý
                              </div>
                            )
                          ) : (
                            <div className="opacity-0 px-4 py-1 select-none">
                              Hiển thị gợi ý
                            </div>
                          )}
                        </div>

                        <div className="flex gap-4">
                          <span className="border dark:border-[#718096] rounded-full p-1">
                            <FiEdit
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingId(flashcard.id);
                                setTempImageUrl(flashcard.imageUrl);
                                setShowEditDialog(true);
                              }}
                            />
                          </span>

                          <span
                            className="border dark:border-[#718096] rounded-full p-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handelStarClick(flashcard.id);
                            }}
                          >
                            {activeStar[flashcard.id] ? (
                              <FaStar className="text-yellow-400" />
                            ) : (
                              <FaRegStar />
                            )}
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
                            className="w-full max-w-[250px] md:max-w-none h-auto md:object-cover object-contain rounded-lg md:w-[80%] md:h-[80%]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* mặt sau */}
                    <div
                      className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col gap-4 p-4 dark:bg-[#2D3748] border-gray-200 dark:border-gray-700 rounded-lg justify-between bg-primary-radiant"
                    >
                      <div className="flex justify-end items-center">
                        <div className="flex gap-4">
                          <span
                            className="border dark:border-[#718096] rounded-full p-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="py-8 flex justify-end items-center gap-4 flex-wrap">
        <button className={button} onClick={() => setFavorite(!favorite)}>
          {favorite ? <IoMdHeart className="text-red-500" /> : <IoMdHeartEmpty />}
        </button>
        <button className={button} onClick={() => setSharedDialog(true)}>
          <FiShare2 />
        </button>
        <img src="/zoom-in.gif" alt="" className="w-10 h-10 cursor-pointer dark:invert dark:saturate-0" onClick={() => setShowDialogZoom(true)} />
      </div>

      <Share
        sharedDialog={sharedDialog}
        setSharedDialog={setSharedDialog}
      />

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

      <Zoom
        showDialogZoom={showDialogZoom}
        setShowDialogZoom={setShowDialogZoom}
        setShowSettingsDialog={setShowSettingsDialog}
        flashcard={card[currentIndex]}
        currentIndex={currentIndex}
        flipped={flipped}
        setFlipped={setFlipped}
        activeStar={activeStar}
        handelStarClick={handelStarClick}
        setTempImageUrl={setTempImageUrl}
        card={card}
        setCard={setCard}
        setApi={setApi}
        setCurrentIndex={setCurrentIndex}
        editingId={editingId}
        setEditingId={setEditingId}
        setShowEditDialog={setShowEditDialog}
        button={button}
      />
    </>
  );
}


