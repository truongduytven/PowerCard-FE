"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SettingTest from "@/components/dialog/setting-test";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
interface QuizAnswer {
  title: string;
  image: string | null;
}

interface QuizQuestion {
  id: string;
  title: string;
  image: string | null;
  answers: QuizAnswer[];
  correctAnswer: string;
}

interface QuizResponse {
  studySetId: string;
  questions: QuizQuestion[];
}


const QUIZ_DATA: QuizResponse = {
  studySetId: "study-set-001",
  questions: [
    {
      id: "q2",
      title: "Produces ATP through cellular respiration",
      image: null,
      answers: [
        {
          title: "Mitochondria",
          image: "https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg",
        },
        {
          title: "Nucleus",
          image: "https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg",
        },
        {
          title: "Ribosome",
          image: "https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg",
        },
        {
          title: "Golgi apparatus",
          image: "https://i.pinimg.com/736x/61/62/2e/61622ec8899cffaa687a8342a84ea525.jpg",
        }
      ],
      correctAnswer: "Mitochondria"
    }
  ]
};

export default function QuizScrollMode() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [value, setValue] = useState("")
  const router = useRouter()

  return (
    <>
      {/* TOP */}
      <div
        className="
        flex items-center justify-between pt-4 px-4 gap-4
        max-sm:flex-col max-sm:items-stretch
    "
      >

        {/* DESKTOP LAYOUT */}
        <div className="flex-1 max-sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[180px] justify-between"
              >
                <span>Test</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Feature</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/learn/1")}>Learn</DropdownMenuItem>
              <DropdownMenuItem>Match</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-col items-center font-bold text-center flex-1 max-sm:hidden">
          <span className="text-lg">12/50</span>
          <span className="text-sm opacity-80">hello</span>
        </div>

        <div className="flex gap-3 items-center flex-1 justify-end max-sm:hidden">
          <img
            src="/settings.gif"
            alt=""
            className="w-9 h-9 cursor-pointer dark:invert dark:saturate-0"
            onClick={() => setShowSettingsDialog(true)}
          />
        </div>
        <div
          className="
            hidden max-sm:flex 
            flex-row items-center justify-between 
            w-full gap-3
        "
        >
          <span className="text-base font-bold">12/50</span>

          <span className="text-sm font-bold opacity-80 text-center flex-1">
            hello
          </span>

          <div className="flex gap-3 items-center">
            <img
              src="/settings.gif"
              alt=""
              className="w-8 h-8 cursor-pointer dark:invert dark:saturate-0"
              onClick={() => setShowSettingsDialog(true)}
            />
          </div>
        </div>

        {/* MOBILE – SELECT row below */}
        <div className="hidden max-sm:block w-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-[180px] justify-between"
              >
                <span>Test</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Feature</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Learn</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/study")}>Flashcard</DropdownMenuItem>
              <DropdownMenuItem>Match</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <hr className="mt-4" />
      <div className="min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-10">
        {/* Quiz Cards */}
        {QUIZ_DATA?.questions?.length > 0 &&
          QUIZ_DATA.questions.map((question, i) => {
            return (
              <div
                key={question.id}
                className="border rounded-3xl py-8 space-y-8 shadow-xl bg-primary-radiant"
              >
                {/* Header */}
                <div className="flex justify-between items-center px-10 text-gray-400">
                  <span>Question</span>
                  <span>
                    {i + 1}/{QUIZ_DATA.questions.length}
                  </span>
                </div>

                {/* Question */}
                <div className="flex flex-col sm:flex-row items-center gap-6 px-10">
                  <h2 className="text-lg font-bold text-center flex-1">
                    {question.title}
                  </h2>

                  {question.image && (
                    <div className="w-40 aspect-square rounded-xl bg-white overflow-hidden shrink-0">
                      <img
                        src={question.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Answers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 pb-6">
                  {question.answers.map((answer, index) => {
                    const label = String.fromCharCode(65 + index); // A, B, C, D

                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl shadow hover:shadow-primary bg-white cursor-pointer transition dark:bg-[#2D3748]"
                      >
                        {/* Label */}
                        <div className="w-8 h-8 shrink-0 rounded-full border border-primary dark:border-white flex items-center justify-center font-medium">
                          {label}
                        </div>

                        {/* Text */}
                        <p className="text-sm sm:text-base flex-1 line-clamp-2">
                          {answer.title}
                        </p>

                        {/* Image (nếu answer là definition) */}
                        {answer.image && (
                          <div className="w-20 aspect-square rounded-xl overflow-hidden shrink-0">
                            <img
                              src={answer.image}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        {/* Footer */}
        <div className="flex flex-col items-center gap-4">
          <img src="/complete-test.gif" alt="" className="h-20 w-20 dark:invert dark:saturate-0" />
          <h2 className="text-xl font-bold text-center">
            Ready to submit your test?
          </h2>
          <button className="relative rounded px-5 py-2.5 overflow-hidden group bg-pink-400 dark:bg-[#2D3748] relative hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-300 dark:hover:from-[#374151] dark:hover:to-[#111827] text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 dark:hover:ring-[#2D3748] transition-all ease-out duration-300 cursor-pointer">
            <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
            <span className="relative">Submit Test</span>
          </button>
        </div>
      </div>

      <SettingTest
        showSettingsDialog={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        value={value}
        setValue={setValue}
      />
    </>
  );
}

