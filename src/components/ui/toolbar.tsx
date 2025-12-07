"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function TextFormattingToolbar() {
    const [selectedColor, setSelectedColor] = useState("bg-primary");
    const [opacity, setOpacity] = useState(80);
    const button = `flex items-center justify-center w-7 h-7 rounded-full text-text-light dark:text-text-darkhover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-primary focus:ring-opacity-50 focus:bg-slate-200 dark:focus:bg-slate-300 focus:text-black dark:focus:text-black transition-colors`
    const colors = [
        "#1E293B", "#64748B", "#EF4444", "#F97316", "#FACC15",
        "#84CC16", "#22C55E", "#10B981", "#06B6D4", "#0EA5E9",
        "#3B82F6", "#6366F1", "#A855F7", "#C026D3"
    ];

    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-full border border-border-light dark:border-border-dark w-[80%]">
            <div className="flex items-center justify-center py-1 gap-1">

                {/* Bold */}
                <button
                    className={button}
                >
                    <span className="font-bold text-lg">B</span>
                </button>

                {/* Italic */}
                <button
                    className={button}
                >
                    <span className="font-serif italic text-lg">I</span>
                </button>

                {/* Underline */}
                <button className={button}>
                    <span className="underline text-lg font-medium">U</span>
                </button>

                {/* Strike */}
                <button className={button}>
                    <span className="line-through text-lg font-medium">S</span>
                </button>

                <Popover>
                    <PopoverTrigger asChild>
                        <button className="flex items-center justify-center w-7 h-7 rounded-full 
              hover:bg-slate-100 dark:hover:bg-slate-700 
              focus:outline-none focus:ring-primary focus:ring-opacity-50 focus:bg-slate-100
              transition-colors">
                            <div
                                className="w-6 h-6 rounded-full p-0 shadow-sm border border-gray-300"
                                style={{
                                    background: `linear-gradient(135deg, #FACC15, #EF4444, #A855F7)`,
                                }}

                            >
                                <div
                                    className="w-full h-full rounded-full"
                                    style={{ backgroundColor: selectedColor }}
                                />
                            </div>
                        </button>
                    </PopoverTrigger>

                    <PopoverContent className="w-64 p-3 my-2">
                        <p className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Colors</p>
                        <div className="grid grid-cols-8 gap-2 mb-4">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    className="w-6 h-6 rounded-full border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-text-light dark:text-text-dark mb-2">Opacity</p>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={opacity}
                            onChange={(e) => setOpacity(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-slate-300 dark:[&::-webkit-slider-thumb]:bg-slate-400 dark:[&::-webkit-slider-thumb]:border-slate-500"
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}
