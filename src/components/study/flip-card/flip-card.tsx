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

export interface Flashcard {
  id: number;
  definition: string;
  term: string;
  imageUrl: string;
}

interface FlipCardProps {
  flashcards: Flashcard[];
  activeStar: { [id: string]: boolean };
  handelStarClick: (id: number) => void;
}

export default function FlipCard({ flashcards, activeStar, handelStarClick }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [card, setCard] = useState<Flashcard[]>(flashcards);
  const [editingId, setEditingId] = useState<number | null>(null);

  const button = `flex flex-1 justify-center items-center px-4 py-2 rounded-md border transition duration-200 bg-white text-black border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transform hover:-translate-y-1 dark:bg-[#0F172B] dark:text-white dark:border-slate-400 dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)]`

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => {
      setFlipped(false);
    };
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api])

  return (
    <>
      <Carousel className="w-full" setApi={setApi}>
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
                            className="w-full max-w-[250px] md:max-w-none h-auto md:object-cover object-contain rounded-lg md:w-[80%] md:h-[80%]"
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
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="py-8 flex justify-between items-center gap-4 flex-wrap">
        <button className={`${button} whitespace-nowrap`}>
          Dễ
        </button>

        <button className={`${button} whitespace-nowrap`}>
          Trung bình
        </button>

        <button className={`${button} whitespace-nowrap`}>
          Khó
        </button>

        <button className={`${button} whitespace-nowrap`}>
          Rất khó
        </button>
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
    </>
  );
}


