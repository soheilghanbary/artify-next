import { useUpload } from '@/hooks/useUpload'
import { cn } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

type Props = {
  onUploaded: (image: string) => void
}

export const AddProductImage = ({ onUploaded }: Props) => {
  const { path, onDrop, loading } = useUpload('', onUploaded)

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
    maxSize: 4 * 1024 * 1024, // 4MB
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    },
  })

  return (
    <button
      type="button"
      className="relative flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-md border bg-muted/20"
      disabled={loading}
      aria-label="Upload product image"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {path ? (
        <Image
          fill
          alt="Uploaded product image"
          className={cn(
            'size-full rounded-[inherit] object-cover',
            loading && 'animate-pulse blur-sm grayscale'
          )}
          src={path}
        />
      ) : (
        <>
          <ImageIcon className="size-6" />
          <p className="text-foreground/75 text-sm">Upload Image</p>
        </>
      )}
    </button>
  )
}
