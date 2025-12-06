import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { GiCardPick } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiExport } from "react-icons/ci";
import { IoPrintOutline } from "react-icons/io5";
interface ActionCardProps {
    title?: string;
    showDeleteDialog: boolean;
    setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
    onEdit?: () => void;
    onExport?: () => void;
    onPrint?: () => void;
    onDelete?: () => void;
}

export default function ActionCard({ title, onEdit, onExport, onPrint, onDelete, showDeleteDialog, setShowDeleteDialog }: ActionCardProps) {

    return (
        <>
            <div className='flex justify-between items-center py-2'>
                <div className='flex justify-between items-center gap-x-1'>
                    <GiCardPick className='text-primary' />
                    <span className='font-bold text-[#38556F] dark:text-white'>{title}</span>
                </div>

                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" aria-label="Open menu" size="icon-sm">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <HiOutlineDotsHorizontal />
                                </TooltipTrigger>
                                <TooltipContent><p>See more</p></TooltipContent>
                            </Tooltip>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuLabel>Card Actions</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onSelect={onEdit}>
                                <span className='flex items-center gap-x-1.5'><CiEdit /> Edit...</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={onExport}>
                                <span className='flex items-center gap-x-1.5'><CiExport /> Export...</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={onPrint}>
                                <span className='flex items-center gap-x-1.5'><IoPrintOutline /> Print...</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
                                <span className='flex items-center gap-x-1.5 text-red-400'><MdDelete /> Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>

        </>
    )
}
