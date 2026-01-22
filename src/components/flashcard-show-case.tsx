import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import { Progress } from "@/components/ui/progress";

const PROGRESS_COUNT = 3;         
const CARD_COUNT = 3;             
const PROGRESS_DURATION = 4000;   

const LEFT_UI_ITEMS = [
    {
        bigCard: true,
        title: "Don't worry about forgetting",
        desc: "Use four response buttons to rate your recall for each flashcard. Based on your choices, the system schedules the next review for optimal retention—so you can focus on what matters most!",
    },
    {
        bigCard: false,
        title: "Multiple StudySets",
        desc: "Add as many studysets as you want with as many flashcards for each. For example, multiple topics for an exam. We'll handle the rest!",
    },
    {
        bigCard: false,
        title: "Test Preparation",
        desc: "Got an exam soon? Just enter the date, how much you want to study each day, and we'll help you prepare as best we can.",
    },
];


const imgUrls = [
    "./image-2.png",
    "./image-2.png",
    "./image-3.png",
];

export default function FlashcardShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);          
    const [progressTriggers, setProgressTriggers] = useState(0); 

    // Auto progress + auto card rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgressTriggers((prev) => prev + 1);
            setActiveIndex((prev) => (prev + 1) % CARD_COUNT);
        }, PROGRESS_DURATION);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto justify-between md:flex md:flex-row flex flex-col gap-10 py-10 text-black dark:text-white">
            <div className="flex-1 p-4 space-y-4">
                {LEFT_UI_ITEMS.map((item, i) => {
                    const cycle = progressTriggers % PROGRESS_COUNT;
                    const isActive = cycle === i;
                    return (
                        <motion.div
                            key={i}
                            animate={{
                                scale: isActive ? 1 : 0.9,
                                // opacity: isActive ? 1 : 0.6,
                            }}
                            transition={{ duration: 0.35 }}
                            className="border rounded-xl bg-white dark:bg-[#1B1B1F] p-4 space-y-4"
                        >

                            {/* Header always visible */}
                            <div className="flex items-center gap-x-2">
                                <FaCircleCheck className="w-6 h-6 text-purple-400" />
                                <span className="font-bold text-xl">{item.title}</span>
                            </div>

                            {/* Description only visible when active */}
                            {isActive && item.desc && (
                                <div className="text-black/70 dark:text-white/70">
                                    {item.desc}
                                </div>
                            )}

                            {/* Progress bar only visible when active */}
                            {isActive && (
                                <div className="relative">
                                    <Progress className="h-1" value={100} />

                                    <motion.div
                                        key={progressTriggers}
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{
                                            duration: PROGRESS_DURATION / 1000,
                                            ease: "linear",
                                        }}
                                        className="absolute top-0 left-0 h-1 bg-purple-500 rounded-full"
                                    />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                className="flex-1 flex items-center justify-center rounded-xl p-6"
                transition={{ duration: 0.5 }}
            >
                <div className="relative w-[600px] h-[400px]">
                    {Array.from({ length: CARD_COUNT }).map((_, i) => {
                        const position = (i - activeIndex + CARD_COUNT) % CARD_COUNT;
                        const layoutMap = [
                            { y: -40, scale: 0.9, zIndex: 1, opacity: 0.3 },
                            { y: -20, scale: 0.95, zIndex: 2, opacity: 0.6 },
                            { y: 0, scale: 1, zIndex: 3, opacity: 1 },
                        ];

                        const cardStyle = layoutMap[position];

                        return (
                            <motion.div
                                key={`card-${i}`}
                                className="absolute inset-0 rounded-2xl shadow-xl border border-white/10 
                               p-6 flex items-center justify-center text-2xl font-semibold 
                               bg-white dark:bg-[#1B1B1F]"
                                style={{ zIndex: cardStyle.zIndex }}
                                animate={{
                                    y: cardStyle.y,
                                    scale: cardStyle.scale,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 120,
                                    damping: 18,
                                    mass: 0.8,
                                }}
                            >
                                {/* Overlay */}
                                <motion.div
                                    className="absolute inset-0 bg-[#E02494] rounded-2xl pointer-events-none"
                                    animate={{ opacity: 1 - cardStyle.opacity }}
                                    transition={{ duration: 0.3 }}
                                />

                                {imgUrls && (
                                    <img
                                        src={imgUrls[i]}
                                        alt={`Flashcard ${i + 1}`}
                                        className="max-w-full max-h-full object-contain relative z-10"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
}
