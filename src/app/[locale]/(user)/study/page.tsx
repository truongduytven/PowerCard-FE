"use client"
import React, { useState } from 'react'
import FlipCard from '@/components/study/flip-card/flip-card'
import { Button as MovingBorderButton } from '@/components/ui/moving-border'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
import FlashcardSettingDialog from '@/components/dialog/flashcard-setting-dialog/flashcard-setting-dialog'
import { TbCards } from "react-icons/tb";
import { ImageUp, Pencil, Volume2 } from 'lucide-react'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { AnimatedBorderCard } from '@/components/ui/border-card'
import TextFormattingToolbar from '@/components/ui/toolbar'
import { IoCloseOutline } from "react-icons/io5";
import ActionButton from '@/components/study/action-button/action-button'
import ActionCard from '@/components/study/action-card/action-card'

type Flashcard = {
  id: number;
  term: string;
  definition: string;
  imageUrl: string;
};

export default function Study() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [value, setValue] = useState("")
  const [activeStar, setActiveStar] = useState<{ [id: string]: boolean }>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [focusedId, setFocusedId] = useState<number | null>(null);

  const buttons = [
    { name: "Learn", tooltip: "Add to library", image: "/book.gif" },
    { name: "Flashcards", tooltip: "Add to review", image: "/flashcard.gif" },
    { name: "Test", tooltip: "Mark as difficult", image: "/test.gif" },
    { name: "Match", tooltip: "Delete card", image: "/match.gif" },
  ]

  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    {
      id: 1,
      definition: "Quá trình một sinh vật tạo ra năng lượng từ thức ăn.",
      term: "Hô hấp tế bào",
      imageUrl: "",
    },
    {
      id: 2,
      definition: "Lực hút giữa hai vật có khối lượng.",
      term: "Trọng lực",
      imageUrl: "https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg",
    },
    {
      id: 3,
      definition: "Đơn vị cấu tạo cơ bản của mọi sinh vật.",
      term: "Tế bào",
      imageUrl: "",
    },
    {
      id: 4,
      definition: "Phản ứng tạo ra năng lượng trong tế bào thực vật.",
      term: "Quang hợp",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
    },
  ]);

  const handelStarClick = (id: number) => {
    setActiveStar((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  const updateFlashcard = (id: number, updated: Partial<Flashcard>) => {
    setFlashcards(prev =>
      prev.map(f => (f.id === id ? { ...f, ...updated } : f))
    );
  };

  const removeImage = (id: number) => {
    updateFlashcard(id, { imageUrl: "" });
  };

  return (
    <div className='h-auto py-8 px-8'>
      <div className='flex flex-col gap-y-4 md:w-[60%] md:px-0 mx-auto'>
        <ActionCard
          title="Flashcard: Everything"
          showDeleteDialog={showDeleteDialog}
          setShowDeleteDialog={setShowDeleteDialog}
        />
        <hr className='border-t rounded-full dark:bg-[#313B4A]' />
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-[#38556F] font-bold dark:text-white'>Progress:</span>
            <span className='text-[#38556F] font-bold dark:text-white'>12/50</span>
          </div>
          <span>
            <Progress value={10} className='h-1.5 bg-primary-radiant' />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 p-4 md:grid-cols-[1fr_3fr_1fr]">
        <div className="py-4 text-center">
          <div className="col-span-12 rounded-lg md:col-span-2 flex flex-wrap justify-center gap-4 md:flex-col md:items-center md:space-y-4 md:space-x-0 md:justify-start">
            {buttons.map((button, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <MovingBorderButton
                    className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 flex gap-x-4 cursor-pointer"
                  >
                    <img src={button.image} alt={`${button.name} icon`} className="w-6 h-6 dark:invert dark:saturate-0" />
                    <span className="w-20 truncate text-center">{button.name}</span>
                  </MovingBorderButton>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{button.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="p-4 text-center">
          <FlipCard
            showSettingsDialog={showSettingsDialog}
            setShowSettingsDialog={setShowSettingsDialog}
            flashcards={flashcards}
            activeStar={activeStar}
            handelStarClick={handelStarClick}
          />
        </div>

        <div className="p-4 text-center">
          <div className="col-span-12 md:col-span-2 flex flex-wrap items-center justify-center gap-4 md:flex md:flex-col md:items-center md:justify-start md:gap-y-8">
            {[
              { icon: "/shuffle.gif", label: "Shuffle", tooltip: "Shuffle cards order" },
              { icon: "/play.gif", label: "Auto play", tooltip: "Auto play cards" },
              { icon: "/setting.gif", label: "Settings", tooltip: "Settings", onClick: () => setShowSettingsDialog(true) },
            ].map((btn) => (
              <ActionButton key={btn.label} {...btn} />
            ))}
          </div>
        </div>
      </div>

      <div>
        <FlashcardSettingDialog
          showSettingsDialog={showSettingsDialog}
          onOpenChange={setShowSettingsDialog}
          value={value}
          setValue={setValue}
        />
      </div>

      <div className='max-w-7xl mx-auto'>
        <div className='flex items-center md:px-20 gap-2'>
          <div><img src="https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg" alt="" className='w-16 h-16 border rounded-full' /></div>
          <div className='flex flex-col'>
            <span className='font-bold text-lg'>Jone nè</span>
            <span className='text-[#718096]'>Jecsica</span>
          </div>
        </div>

        <div className='flex flex-col md:flex md:flex-row md:justify-between md:items-center md:px-18 py-8 gap-4'>
          <div className='flex md:justify-center items-center gap-1 text-xl'>
            <span><TbCards className='text-[#E02494] text-3xl' /></span>
            <span className='text-xl'><span className='text-3xl'>46</span> term in this set</span>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select a fruit" />
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

        {flashcards && flashcards.length > 0 &&
          flashcards.map((flashcard, index) => {
            const imageUrl = flashcard.imageUrl;
            return (
              <div className="md:px-18" key={flashcard.id}>
                <AnimatedBorderCard className="my-4 w-full">
                  <div className="flex flex-col md:flex-row w-full py-4 md:items-center gap-4">

                    {/* Icons */}
                    <div className="order-1 md:order-5 flex items-center gap-3 px-6 justify-between shrink-0">
                      <Pencil
                        className="w-4 h-4 cursor-pointer"
                        onClick={() =>
                          setEditingId(editingId === flashcard.id ? null : flashcard.id)
                        }
                      />
                      <div className="flex gap-2">
                        <Volume2 className="w-4 h-4" />
                        <span onClick={() => handelStarClick(flashcard.id)}>
                          {activeStar[flashcard.id] ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="order-2 md:order-2 flex items-center">
                      <div
                        className={`w-full md:w-px h-px md:h-20 bg-gray-300 dark:bg-[#2D3748] ${!imageUrl ? "md:h-10" : ""
                          }`}
                      />
                    </div>

                    {/* Definition */}
                    <div className="order-3 md:order-1 flex-1 flex flex-col px-6 gap-2">
                      <div className="flex flex-col gap-3">
                        {editingId === flashcard.id && (
                          <span className="lg:w-1/2 md:w-2/3 sm:w-1/4 w-1/3">
                            <TextFormattingToolbar />
                          </span>
                        )}
                        <span>{flashcard.definition}</span>
                      </div>
                      {
                        editingId === flashcard.id && (
                          <div className="w-full h-px bg-gray-300 dark:bg-[#2D3748]" />
                        )
                      }
                    </div>

                    {/* Term */}
                    <div className="order-4 md:order-3 flex-1 flex flex-col px-6 gap-2">
                      <div className="flex flex-col gap-3">
                        {editingId === flashcard.id && (
                          <span className="lg:w-1/2 md:w-2/3 sm:w-1/4 w-1/3">
                            <TextFormattingToolbar />
                          </span>
                        )}
                        <input
                          type="text"
                          className="w-full border-none outline-none focus:ring-0"
                          value={flashcard.term}
                          onChange={(e) =>
                            setFlashcards(prev =>
                              prev.map(f =>
                                f.id === flashcard.id ? { ...f, term: e.target.value } : f
                              )
                            )
                          }
                          onFocus={() => setFocusedId(flashcard.id)}
                          onBlur={() => setFocusedId(null)}
                        />
                      </div>
                      {editingId === flashcard.id && (
                        <div className={`w-full h-px ${focusedId === flashcard.id
                          ? "bg-primary"
                          : "bg-gray-300 dark:bg-[#2D3748]"
                          }`} />
                      )}
                    </div>

                    {/* Image */}
                    <div className="relative w-[200px] md:w-[100px] order-5 md:order-4 pl-6 shrink-0 md:px-0">
                      {imageUrl ? (
                        <>
                          <img
                            src={imageUrl}
                            className="rounded-lg object-cover md:h-20 h-30 w-full"
                          />
                          {editingId === flashcard.id && (
                            <IoCloseOutline
                              className="absolute w-6 h-6 -top-2 -right-2 text-white bg-black/50 rounded-md p-1 cursor-pointer"
                              onClick={() => removeImage(flashcard.id)}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {editingId === flashcard.id && (
                            <label className="cursor-pointer">
                              <div className='order-5 md:order-4 md:w-[100px] w-[200px] border-2 border-dashed h-30 md:h-20 flex justify-center items-center rounded-lg'>
                                <ImageUp />
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const url = URL.createObjectURL(file); // preview tạm
                                    updateFlashcard(flashcard.id, { imageUrl: url });
                                  }}
                                />
                              </div>
                            </label>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </AnimatedBorderCard>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
