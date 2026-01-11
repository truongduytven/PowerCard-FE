"use client";
import { useState, useRef } from "react";
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
import ConfirmSubmitTest from "@/components/dialog/confirm-submit-test";
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
      id: "1",
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
    },

    {
      id: "2",
      title: "Controls cell activities and stores genetic material",
      image: null,
      answers: [
        {
          title: "Nucleus",
          image: "https://cdn.britannica.com/83/103083-050-9F5B91F3/nucleus-cell.jpg",
        },
        {
          title: "Mitochondria",
          image: "https://cdn.britannica.com/83/103083-050-9F5B91F3/nucleus-cell.jpg",
        },
        {
          title: "Cell membrane",
          image: "https://cdn.britannica.com/83/103083-050-9F5B91F3/nucleus-cell.jpg",
        },
        {
          title: "Lysosome",
          image: "https://cdn.britannica.com/83/103083-050-9F5B91F3/nucleus-cell.jpg",
        }
      ],
      correctAnswer: "Nucleus"
    },

    {
      id: "3",
      title: "Responsible for protein synthesis",
      image: null,
      answers: [
        {
          title: "Ribosome",
          image: "https://cdn.kastatic.org/ka-perseus-images/9b2b0c8c0a6c7a2f9a67d5c89bce8e6c.png",
        },
        {
          title: "Golgi apparatus",
          image: "https://cdn.kastatic.org/ka-perseus-images/9b2b0c8c0a6c7a2f9a67d5c89bce8e6c.png",
        },
        {
          title: "Endoplasmic reticulum",
          image: "https://cdn.kastatic.org/ka-perseus-images/9b2b0c8c0a6c7a2f9a67d5c89bce8e6c.png",
        },
        {
          title: "Lysosome",
          image: "https://cdn.kastatic.org/ka-perseus-images/9b2b0c8c0a6c7a2f9a67d5c89bce8e6c.png",
        }
      ],
      correctAnswer: "Ribosome"
    },

    {
      id: "4",
      title: "Modifies, sorts, and packages proteins for secretion",
      image: null,
      answers: [
        {
          title: "Golgi apparatus",
          image: "https://cdn.britannica.com/68/198168-050-3E8D7A55/Golgi-apparatus.jpg",
        },
        {
          title: "Ribosome",
          image: "https://cdn.britannica.com/68/198168-050-3E8D7A55/Golgi-apparatus.jpg",
        },
        {
          title: "Nucleus",
          image: "https://cdn.britannica.com/68/198168-050-3E8D7A55/Golgi-apparatus.jpg",
        },
        {
          title: "Mitochondria",
          image: "https://cdn.britannica.com/68/198168-050-3E8D7A55/Golgi-apparatus.jpg",
        }
      ],
      correctAnswer: "Golgi apparatus"
    },

    {
      id: "5",
      title: "Breaks down waste materials and cellular debris",
      image: null,
      answers: [
        {
          title: "Lysosome",
          image: "https://cdn.kastatic.org/ka-perseus-images/4a7e8c2f3a5d5f8c6bfa1f1a60c3bde7.png",
        },
        {
          title: "Ribosome",
          image: "https://cdn.kastatic.org/ka-perseus-images/4a7e8c2f3a5d5f8c6bfa1f1a60c3bde7.png",
        },
        {
          title: "Golgi apparatus",
          image: "https://cdn.kastatic.org/ka-perseus-images/4a7e8c2f3a5d5f8c6bfa1f1a60c3bde7.png",
        },
        {
          title: "Endoplasmic reticulum",
          image: "https://cdn.kastatic.org/ka-perseus-images/4a7e8c2f3a5d5f8c6bfa1f1a60c3bde7.png",
        }
      ],
      correctAnswer: "Lysosome"
    },
    {
      id: "6",
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
    },
  ]
};

export default function QuizScrollMode() {
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [value, setValue] = useState("")
  const router = useRouter()
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const findFirstUnansweredQuestion = () => {
    return QUIZ_DATA.questions.find(q => !selectedAnswers[q.id])
  }

  const findNextUnansweredQuestion = (currentQuestionId: string) => {
    const currentIndex = QUIZ_DATA.questions.findIndex(q => q.id === currentQuestionId)
    // Tìm câu tiếp theo chưa chọn
    for (let i = currentIndex + 1; i < QUIZ_DATA.questions.length; i++) {
      if (!selectedAnswers[QUIZ_DATA.questions[i].id]) {
        return QUIZ_DATA.questions[i]
      }
    }
    // Nếu không có câu nào phía sau, tìm từ đầu
    for (let i = 0; i < currentIndex; i++) {
      if (!selectedAnswers[QUIZ_DATA.questions[i].id]) {
        return QUIZ_DATA.questions[i]
      }
    }
    return null
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (!isSubmitted) {
      setSelectedAnswers(prev => {
        const newAnswers = {
          ...prev,
          [questionId]: answer
        }

        // Sau khi set state, tìm câu tiếp theo chưa chọn
        setTimeout(() => {
          const nextQuestion = findNextUnansweredQuestion(questionId)
          if (nextQuestion) {
            scrollToQuestion(nextQuestion.id)
          }
        }, 300)

        return newAnswers
      })
    }
  }

  const checkAllAnswered = () => {
    return QUIZ_DATA.questions.length === Object.keys(selectedAnswers).length
  }

  const handleSubmitClick = () => {
    if (checkAllAnswered()) {
      setIsSubmitted(true)
    } else {
      setShowConfirmDialog(true)
    }
  }

  const confirmSubmit = () => {
    setIsSubmitted(true)
    setShowConfirmDialog(false)
  }

  const handleContinueTest = () => {
    setShowConfirmDialog(false)
    // Scroll đến câu đầu tiên chưa chọn
    const firstUnanswered = findFirstUnansweredQuestion()
    if (firstUnanswered) {
      setTimeout(() => {
        scrollToQuestion(firstUnanswered.id)
      }, 100)
    }
  }

  const scrollToQuestion = (questionId: string) => {
    questionRefs.current[questionId]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }

  const getQuestionStatus = (question: QuizQuestion) => {
    if (!isSubmitted) return null
    const userAnswer = selectedAnswers[question.id]
    if (!userAnswer) return null
    return userAnswer === question.correctAnswer ? 'correct' : 'incorrect'
  }

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

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar - Answer Navigation */}
        <div className="w-[90%] mx-auto lg:w-64 lg:sticky top-20 h-fit p-4 bg-white dark:bg-[#1a1a2e] rounded-xl shadow-lg lg:ml-4 mt-4 lg:mt-8 lg:mx-0">
          <h3 className="font-bold text-lg mb-4 text-center">
            {isSubmitted ? 'Kết quả' : 'Tiến độ'}
          </h3>
          <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-5 gap-2">
            {QUIZ_DATA.questions.map((question, i) => {
              const status = getQuestionStatus(question)
              const isAnswered = !!selectedAnswers[question.id]
              return (
                <button
                  key={question.id}
                  onClick={() => scrollToQuestion(question.id)}
                  className={`
                      w-10 h-10 rounded-lg font-semibold flex items-center justify-center
                      transition-all hover:scale-110 relative
                      ${isSubmitted && status === 'correct' ? 'bg-green-500 text-white' : ''}
                      ${isSubmitted && status === 'incorrect' ? 'bg-red-500 text-white' : ''}
                      ${!isSubmitted && isAnswered ? 'bg-primary text-white' : ''}
                      ${!isSubmitted && !isAnswered ? 'bg-gray-300 dark:bg-gray-700' : ''}
                      ${isSubmitted && !status ? 'bg-gray-300 dark:bg-gray-700' : ''}
                    `}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t dark:border-gray-700 space-y-2 text-sm">
            {!isSubmitted && (
              <div className="flex justify-between">
                <span>Đã chọn:</span>
                <span className="font-bold text-blue-500">
                  {Object.keys(selectedAnswers).length}/{QUIZ_DATA.questions.length}
                </span>
              </div>
            )}
            {isSubmitted && (
              <>
                <div className="flex justify-between">
                  <span>Đúng:</span>
                  <span className="font-bold text-green-500">
                    {QUIZ_DATA.questions.filter(q => getQuestionStatus(q) === 'correct').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sai:</span>
                  <span className="font-bold text-red-500">
                    {QUIZ_DATA.questions.filter(q => getQuestionStatus(q) === 'incorrect').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tổng:</span>
                  <span className="font-bold">
                    {QUIZ_DATA.questions.length}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen max-w-3xl mx-auto px-4 py-8 space-y-10">
          {/* Quiz Cards */}
          {QUIZ_DATA?.questions?.length > 0 &&
            QUIZ_DATA.questions.map((question, i) => {
              return (
                <div
                  key={question.id}
                  ref={(el) => { questionRefs.current[question.id] = el }}
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
                      const isSelected = selectedAnswers[question.id] === answer.title
                      const isCorrect = answer.title === question.correctAnswer
                      const showCorrect = isSubmitted && isCorrect
                      const showWrong = isSubmitted && isSelected && !isCorrect

                      return (
                        <div
                          key={index}
                          onClick={() => handleAnswerSelect(question.id, answer.title)}
                          className={`flex items-center gap-3 p-4 rounded-xl shadow transition
                          ${!isSubmitted && 'hover:shadow-primary cursor-pointer'}
                          ${isSelected && !isSubmitted ? 'ring-2 ring-primary dark:bg-blue-900/20' : 'bg-white dark:bg-[#2D3748]'}
                          ${showCorrect ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''}
                          ${showWrong ? 'ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                        `}
                        >
                          {/* Check đáp án */}
                          {isSubmitted && (
                            <div className="shrink-0">
                              {showCorrect && (
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                              {showWrong && (
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                              {!showCorrect && !showWrong && isCorrect && (
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              )}
                            </div>
                          )}

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
            <button
              onClick={handleSubmitClick}
              disabled={isSubmitted}
              className={`relative rounded px-5 py-2.5 overflow-hidden group bg-pink-400 dark:bg-[#2D3748] relative hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-300 dark:hover:from-[#374151] dark:hover:to-[#111827] text-white hover:ring-2 hover:ring-offset-2 hover:ring-pink-400 dark:hover:ring-[#2D3748] transition-all ease-out duration-300 cursor-pointer
            ${isSubmitted ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative">{isSubmitted ? 'Submitted' : 'Submit Test'}</span>
            </button>
          </div>
        </div>
      </div>

      <ConfirmSubmitTest
        showConfirmDialog={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={confirmSubmit}
        onContinue={handleContinueTest}
        selectedAnswersCount={Object.keys(selectedAnswers).length}
        totalQuestionsCount={QUIZ_DATA.questions.length}
      />

      <SettingTest
        showSettingsDialog={showSettingsDialog}
        onOpenChange={setShowSettingsDialog}
        value={value}
        setValue={setValue}
      />
    </>
  );
}

