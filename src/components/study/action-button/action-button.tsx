import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface ActionButtonProps {
    icon: string;
    label: string;
    tooltip: string;
    onClick?: () => void;
}

export default function ActionButton({ icon, label, tooltip, onClick }: ActionButtonProps) {
    return (
        <div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 dark:border-[#2D3748] bg-white dark:bg-[#0F172B] dark:text-white hover:-translate-y-1 transform transition duration-200 hover:shadow-md cursor-pointer"
                        onClick={onClick}
                    >
                        <img src={icon} className="w-6 h-6 shrink-0 dark:invert dark:saturate-0" />
                        <span className="w-20 text-center truncate">{label}</span>
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    )
}
