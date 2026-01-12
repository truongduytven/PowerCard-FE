import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { CiCamera } from "react-icons/ci";
import { IoMdPerson } from "react-icons/io";
import { FaLock } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import { BiKey } from "react-icons/bi";
import { GoCheckCircle } from "react-icons/go";
import { useAuthStore } from '@/stores/authStore';

interface ProfileData {
    username: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface ProfileUpdateDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ProfileUpdateDialog: React.FC<ProfileUpdateDialogProps> = ({ open, onOpenChange }) => {
    const { user } = useAuthStore();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>();

    // Populate form với data từ store khi dialog mở hoặc khi user data thay đổi
    useEffect(() => {
        if (open && user) {
            reset({
                username: user.username,
                email: user.email,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    }, [open, user, reset]);

    const onSubmit = (data: ProfileData) => {
        console.log('Profile data submitted:', data);
        // TODO: Handle profile update logic here
        onOpenChange(false);
    };

    const handleCancel = () => {
        onOpenChange(false);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {/* Dialog Content */}
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#0d0d1b]">
                            Cập nhật Hồ sơ
                        </DialogTitle>
                        <DialogDescription className="text-[#4c4c9a]">
                            Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
                        </DialogDescription>
                    </DialogHeader>

                    {/* Profile Picture Section */}
                    <div className="flex flex-col sm:flex-row gap-8 items-center border-b border-[#f0f0f5] pb-8 my-4">
                        <div className="relative group">
                            <div className="relative p-[3px] rounded-full bg-radiant shadow-lg">
                                <div className="rounded-full border-[3px] border-white overflow-hidden size-32 bg-white">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{
                                            backgroundImage: `url("${user?.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjfOKqFRaEwX99V3PC5UoO5qY0YLeEtYyQzJZ8wNn0f65oYtlVsc57B7vvDr9SORFkMhb8kLZWu-0FVkAXu6rKkA4wlL22UVzPMrfrLbbcGRyOJzqzTRX4pcs6WUs6LI5d4ZzN49ttYiy4FUTrp4PaIglpAJ6mWfBpFB-v08nbo-wMR9oAVl0mPbc46lfHXp9IPATs2n9nuH3zDXVJBctCB402xb58-w3y2cIVhGCJ8e6-wGfrJLCGBhSGSYAheb2IsRp3DTiHmxo'}")`,
                                        }}
                                    />
                                </div>
                            </div>
                            <Button
                                type="button"
                                size="icon"
                                className="absolute bottom-1 right-1 size-10 rounded-full bg-radiant text-white shadow-lg border-2 border-white hover:scale-105 transition-transform"
                                aria-label="Thay đổi ảnh đại diện"
                            >
                                <CiCamera className='size-5' />
                            </Button>

                        </div>
                        <div className="flex flex-col gap-2 text-center sm:text-left">
                            <h3 className="text-[#0d0d1b] text-xl font-bold">{user?.username || 'Người dùng'}</h3>
                            <p className="text-[#4c4c9a] text-sm">
                                Cho phép định dạng ảnh JPG, GIF hoặc PNG. Tối đa 5MB.
                            </p>
                            <div className="flex gap-3 justify-center sm:justify-start mt-2">
                                <span className='bg-white text-primary p-0 cursor-pointer'>
                                    Xóa ảnh
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary"><IoMdPerson /></span>
                            <h3 className="text-[#0d0d1b] text-lg font-bold">Thông tin cơ bản</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[#0d0d1b] text-sm font-semibold">
                                    Họ và tên
                                </Label>
                                <Input
                                    id="name"
                                    defaultValue={user?.username || ''}
                                    className="w-full rounded-lg border border-[#cfcfe7] bg-white h-12 focus:border-primary focus-visible:ring-primary"
                                    placeholder="Nhập họ và tên của bạn"
                                    {...register('username', { required: 'Họ và tên là bắt buộc' })}
                                />
                                {errors.username && (
                                    <p className="text-sm text-red-500">{errors.username.message}</p>
                                )}
                            </div>

                            {/* Email Field (Read Only) */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#0d0d1b] text-sm font-semibold">
                                    Email <span className="text-[#4c4c9a] font-normal text-xs">(Không thể chỉnh sửa)</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        defaultValue={user?.email || ''}
                                        className="w-full rounded-lg border border-[#e5e7eb] bg-[#f8f8fc] h-12 text-[#6b7280] cursor-not-allowed"
                                        disabled
                                        {...register('email')}
                                    />
                                    <span className="material-symbols-outlined absolute right-3 top-3 text-[#9ca3af] text-[20px]">
                                        <FaLock />
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Password Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-primary"><SiSpringsecurity /></span>
                            <h3 className="text-[#0d0d1b] text-lg font-bold">Bảo mật & Mật khẩu</h3>
                        </div>

                        <div className="space-y-6 max-w-lg">
                            {/* Current Password */}
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword" className="text-[#0d0d1b] text-sm font-semibold">
                                    Mật khẩu hiện tại
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    className="w-full rounded-lg border border-[#cfcfe7] bg-white h-12 focus:border-primary focus-visible:ring-primary"
                                    placeholder="••••••••"
                                    {...register('currentPassword')}
                                />
                            </div>

                            {/* New Password Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword" className="text-[#0d0d1b] text-sm font-semibold">
                                        Mật khẩu mới
                                    </Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        className="w-full rounded-lg border border-[#cfcfe7] bg-white h-12 focus:border-primary focus-visible:ring-primary"
                                        placeholder="••••••••"
                                        {...register('newPassword')}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-[#0d0d1b] text-sm font-semibold">
                                        Xác nhận mật khẩu
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className="w-full rounded-lg border border-[#cfcfe7] bg-white h-12 focus:border-primary focus-visible:ring-primary"
                                        placeholder="••••••••"
                                        {...register('confirmPassword')}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start pt-2">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex items-center gap-2 text-primary font-bold text-sm bg-primary/10 hover:bg-pink-100 px-4 py-2 rounded-lg"
                                >
                                    <span className="material-symbols-outlined text-[18px]"><BiKey /></span>
                                    Đổi Mật khẩu
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Dialog Footer */}
                    <DialogFooter className="flex flex-col md:flex-row justify-end items-center gap-4 pt-8 pb-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            className="px-6 py-3 text-[#4c4c9a] font-medium hover:text-[#0d0d1b] border-none shadow-none hover:bg-pink-100 cursor-pointer"
                        >
                            Hủy bỏ
                        </Button>
                        <Button
                            type="submit"
                            className="flex min-w-[200px] items-center justify-center gap-2 rounded-xl h-12 px-8 bg-radiant shadow-lg hover:shadow-pink-500/50 hover:opacity-95 transition-all cursor-pointer"
                        >
                            <span className="text-base font-bold tracking-[0.015em]">Lưu Thay đổi</span>
                            <span className="material-symbols-outlined text-[20px]"><GoCheckCircle /></span>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileUpdateDialog;