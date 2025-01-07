import { CloudUploadIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { useUpload } from '@/hooks/useUpload'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

type Props = {
  initialImage: string
  onChange: (image: string) => void
}

export const EditUserImage = ({ initialImage, onChange }: Props) => {
  const { path, onDrop, loading } = useUpload(initialImage, onChange)
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
    maxSize: 2 * 1024 * 1024,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
    },
  })

  return (
    <div className="col-span-2 flex items-center gap-4">
      <Image
        draggable={false}
        src={path}
        alt="upload"
        width={80}
        height={80}
        sizes="80px"
        quality={100}
        loading="lazy"
        className={cn(
          'size-20 rounded-full border border-border/40 bg-muted object-cover',
          loading && 'animate-pulse'
        )}
      />
      <Button
        disabled={loading}
        {...getRootProps()}
        size="sm"
        variant="outline"
        type="button"
      >
        <input {...getInputProps()} />
        <CloudUploadIcon className="text-current" />
        Upload Image
      </Button>
    </div>
  )
}
