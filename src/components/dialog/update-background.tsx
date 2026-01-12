"use client"

import { useState } from "react"
import { Check, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"

interface UpdateBackgroundDialogProps {
    showUploadDialog: boolean
    setShowUploadDialog: (value: boolean) => void
    showGalleryDialog: boolean
    setShowGalleryDialog: (value: boolean) => void
    selectedImage: string | null
    setSelectedImage: (value: string | null) => void
    selectedGalleryImage: string | null
    setSelectedGalleryImage: (value: string | null) => void
    handleImageUpload: (event: any) => void
    handleSaveCover: () => void
    handleSelectFromGallery: (imageUrl: string) => void
}

interface GalleryImage {
    id: string;
    url: string;
    alt?: string;
}
export function UpdateBackgroundDialog({
    showUploadDialog,
    setShowUploadDialog,
    showGalleryDialog,
    setShowGalleryDialog,
    selectedImage,
    setSelectedImage,
    selectedGalleryImage,
    setSelectedGalleryImage,
    handleImageUpload,
    handleSaveCover,
    handleSelectFromGallery
}: UpdateBackgroundDialogProps) {

    const [galleryImages] = useState<GalleryImage[]>([
        { id: '1', url: 'https://picsum.photos/seed/img1/400/200' },
        { id: '2', url: 'https://picsum.photos/seed/img2/400/200' },
        { id: '3', url: 'https://picsum.photos/seed/img3/400/200' },
        { id: '4', url: 'https://picsum.photos/seed/img4/400/200' },
        { id: '5', url: 'https://picsum.photos/seed/img5/400/200' },
        { id: '6', url: 'https://picsum.photos/seed/img6/400/200' },
    ]);

    return (
        <>
            {/* <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Provide a name for your new file. Click create when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="pb-3">
            <Field>
              <FieldLabel htmlFor="filename">File Name</FieldLabel>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-3">
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="shadcn@vercel.com"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Check out this file"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
            <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Upload Cover Photo</DialogTitle>
                        <DialogDescription>
                            Upload a new cover photo for your profile
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-3">
                        {/* Preview area */}
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Upload className="h-12 w-12 text-gray-400" />
                                <div className="text-sm text-gray-500">
                                    <label htmlFor="cover-upload" className="cursor-pointer font-medium text-primary hover:underline">
                                        Click to upload
                                    </label>
                                    <span className="ml-1">or drag and drop</span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    PNG, JPG, GIF up to 5MB
                                </p>
                            </div>
                            <input
                                id="cover-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
                        </div>

                        {/* Selected image preview */}
                        {selectedImage && (
                            <div className="mt-4">
                                <p className="text-sm font-medium mb-2">Preview:</p>
                                <div className="relative h-40 rounded-md overflow-hidden">
                                    <img
                                        src={selectedImage}
                                        alt="Cover preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            onClick={handleSaveCover}
                            disabled={!selectedImage}
                        >
                            Set as Cover
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Gallery dialog để chọn ảnh có sẵn */}
            <Dialog open={showGalleryDialog} onOpenChange={setShowGalleryDialog}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Choose Cover Photo</DialogTitle>
                        <DialogDescription>
                            Select a cover photo from your gallery
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-3">
                        <div className="grid grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-1">
                            {galleryImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`
              relative aspect-video rounded-md overflow-hidden cursor-pointer
              border-2 ${selectedGalleryImage === image.url ? 'border-primary' : 'border-transparent'}
              hover:border-primary/50 transition-all
            `}
                                    onClick={() => setSelectedGalleryImage(image.url)}
                                >
                                    <img
                                        src={image.url}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {selectedGalleryImage === image.url && (
                                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                                            <Check className="h-8 w-8 text-white" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="button"
                            onClick={() => selectedGalleryImage && handleSelectFromGallery(selectedGalleryImage)}
                            disabled={!selectedGalleryImage}
                        >
                            Use This Photo
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
