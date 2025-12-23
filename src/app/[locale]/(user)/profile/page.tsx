"use client"
import React, { useState } from "react";
import { FaCameraRetro } from "react-icons/fa6";
import ProfileUpdateDialog from "@/components/dialog/edit-profile";
import { UpdateBackgroundDialog } from "@/components/dialog/update-background";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { MdEdit } from "react-icons/md";

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [showUploadDialog, setShowUploadDialog] = useState<boolean>(false);
    const [showGalleryDialog, setShowGalleryDialog] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState<'decks' | 'stats' | 'saved' | 'settings'>('decks');

    const { user } = useAuthStore();

    console.log("check user", user)

    // Format joined date
    const formatJoinedDate = (dateString?: string) => {
        if (!dateString) return 'Joined recently';

        const date = new Date(dateString);
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `Joined ${month} ${year}`;
    };
    // Handle image upload
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle save cover from upload
    const handleSaveCover = () => {
        if (uploadedFile && selectedImage) {
            // TODO: Upload to server and update cover photo
            console.log('Saving cover:', uploadedFile);
            setShowUploadDialog(false);
            resetUploadState();
        }
    };

    // Handle select from gallery
    const handleSelectFromGallery = () => {
        if (selectedGalleryImage) {
            // TODO: Update cover photo with gallery image
            console.log('Selecting from gallery:', selectedGalleryImage);
            setShowGalleryDialog(false);
            resetGalleryState();
        }
    };

    // Remove cover photo
    const handleRemoveCover = () => {
        // TODO: Remove cover photo from server
        console.log('Removing cover photo');
    };

    // Reset upload state
    const resetUploadState = () => {
        setSelectedImage(null);
        setUploadedFile(null);
    };

    // Reset gallery state
    const resetGalleryState = () => {
        setSelectedGalleryImage(null);
    };


    return (
        <div className="bg-background-light text-text-main min-h-screen">
            <main className="flex justify-center px-4 md:px-6 lg:px-40 py-6">
                <div className="w-full max-w-[960px] flex flex-col gap-6">
                    <div className="relative w-full">
                        {/* Cover */}
                        <div className="relative w-full h-40 md:h-80 rounded-2xl overflow-hidden shadow-sm">

                            {/* Cover image */}
                            <div className="absolute inset-0 group">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeO0lpfg_a7NF1MsyfDwRWeig8bQSOjfMV3I7e_ftMRT_juqCHMbah1T3zLirey-SztEFKdW-1NMwVB1LQLyZ_-qZalUL_pZa3CUWQFvoQwoUWtlVd4dikuytmRWum76l-KaXzIaAh_qrzbLxONQLiHVQ5ec6nyXIfUoJFJddWzayewRhP8Cv0-CwEDgHLLwB9kiRvVjt6z9MXFVR25G0xP8HiVSnr5XvzbPaYxzK5ga6lqOju3_FdIBwtkHjinWx1d2h9WOkmrEY")`,
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            {/* Edit cover */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-slate-900 shadow-md backdrop-blur-sm cursor-pointer"
                                    >
                                        <FaCameraRetro className="text-[18px]" />
                                        <span className="hidden md:inline text-sm font-medium">Edit Cover</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48" align="end">
                                    <DropdownMenuLabel>Cover Photo Options</DropdownMenuLabel>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem onClick={() => setShowUploadDialog(true)}>
                                            <Upload className="mr-2 h-4 w-4" />
                                            <span>Upload Photo</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setShowGalleryDialog(true)}>
                                            <ImageIcon className="mr-2 h-4 w-4" />
                                            <span>Choose from Gallery</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleRemoveCover} className="text-red-600">
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            <span>Remove Cover</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Edit profile (bottom right of cover) */}
                            <button
                                onClick={() => setIsOpen(true)}
                                className="group absolute bottom-4 right-4 z-20 inline-flex items-center justify-center p-2.5 md:px-6 md:py-2.5 bg-white md:bg-transparent text-slate-900 md:text-white overflow-hidden font-bold rounded-lg md:rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_20px_rgba(19,19,236,0.25)] shadow-md"
                            >
                                <span className="absolute inset-0 w-full h-full hidden md:block bg-radiant" />
                                <span className="absolute bottom-0 right-0 w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-white opacity-20 group-hover:rotate-90 ease hidden md:block" />
                                <span className="relative flex items-center justify-center gap-2">
                                    <MdEdit className="text-[18px]" />
                                    <span className="hidden md:inline text-sm font-medium cursor-pointer">
                                        Chỉnh sửa hồ sơ
                                    </span>
                                </span>
                            </button>
                        </div>

                        {/* Avatar – centered at bottom edge of cover */}
                        <div className="absolute left-1/2 md:left-30 bottom-0 z-30 -translate-x-1/2 translate-y-1/2">
                            <div className="relative p-[3px] rounded-full bg-radiant shadow-lg">
                                <div className="rounded-full border-[3px] border-white overflow-hidden size-32 md:size-40 bg-white">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url("${user?.avatarUrl}")`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Online status */}
                            <div className="absolute bottom-4 right-2.5 md:bottom-5 md:right-4 size-4 bg-green-500 border-[3px] border-white rounded-full shadow-sm" />
                        </div>
                    </div>

                    {/* ================= PROFILE INFO ================= */}
                    <div className="pt-14 md:pt-18 px-4 md:px-8 text-center md:text-left">
                        <h1 className="text-3xl md:text-[32px] font-bold">
                            {user?.username}
                        </h1>
                        <p className="text-slate-500 font-medium">
                            {user?.email} • {formatJoinedDate(user?.createdAt)}
                        </p>

                        <p className="mt-3 text-slate-700 max-w-2xl mx-auto md:mx-0 dark:text-[#62748E]">
                            Lifelong learner. Mastering Japanese & Coding with radiant energy.
                            Currently building a streak on Kanji decks!
                        </p>

                        <div className="flex gap-2 mt-4 flex-wrap justify-center md:justify-start">
                            <span className="px-3 py-1 rounded-full bg-slate-50 border text-xs font-semibold text-blue-600">
                                Student
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-50 border text-xs font-semibold text-purple-600">
                                Premium
                            </span>
                            <span className="px-3 py-1 rounded-full bg-slate-50 border text-xs font-semibold text-emerald-600">
                                Japanese N3
                            </span>
                        </div>
                    </div>

                    {/* ================= NAV TABS ================= */}
                    <div className="sticky top-16 md:top-[72px] z-40 bg-white/95 backdrop-blur-xl px-4 dark:bg-[#1C1923]">
                        <div className="flex gap-8 overflow-x-auto border-b">
                            <button
                                onClick={() => setActiveTab('decks')}
                                className={`py-3 transition-colors relative ${activeTab === 'decks'
                                    ? 'font-bold text-primary'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Decks
                                {activeTab === 'decks' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('stats')}
                                className={`py-3 transition-colors relative ${activeTab === 'stats'
                                    ? 'font-bold text-primary'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Stats
                                {activeTab === 'stats' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('saved')}
                                className={`py-3 transition-colors relative ${activeTab === 'saved'
                                    ? 'font-bold text-primary'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Saved
                                {activeTab === 'saved' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab('settings')}
                                className={`py-3 transition-colors relative ${activeTab === 'settings'
                                    ? 'font-bold text-primary'
                                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
                                    }`}
                            >
                                Settings
                                {activeTab === 'settings' && (
                                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* ================= TAB CONTENT ================= */}
                    <div className="px-4 md:px-8 py-6">
                        {activeTab === 'decks' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">My Decks</h2>
                                <p className="text-slate-600">Your study sets will appear here.</p>
                                {/* TODO: Add deck cards here */}
                            </div>
                        )}

                        {activeTab === 'stats' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Statistics</h2>
                                <p className="text-slate-600">Your learning progress and statistics.</p>
                                {/* TODO: Add statistics charts here */}
                            </div>
                        )}

                        {activeTab === 'saved' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Saved Items</h2>
                                <p className="text-slate-600">Items you've bookmarked will appear here.</p>
                                {/* TODO: Add saved items here */}
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold">Account Settings</h2>
                                <p className="text-slate-600">Manage your account preferences.</p>
                                {/* TODO: Add settings form here */}
                            </div>
                        )}
                    </div>

                    <ProfileUpdateDialog open={isOpen} onOpenChange={setIsOpen} />
                    <UpdateBackgroundDialog
                        showUploadDialog={showUploadDialog}
                        setShowUploadDialog={setShowUploadDialog}
                        showGalleryDialog={showGalleryDialog}
                        setShowGalleryDialog={setShowGalleryDialog}
                        selectedImage={selectedImage}
                        setSelectedImage={setSelectedImage}
                        selectedGalleryImage={selectedGalleryImage}
                        setSelectedGalleryImage={setSelectedGalleryImage}
                        handleImageUpload={handleImageUpload}
                        handleSaveCover={handleSaveCover}
                        handleSelectFromGallery={handleSelectFromGallery}
                    />
                </div>
            </main>
        </div>
    );
}
