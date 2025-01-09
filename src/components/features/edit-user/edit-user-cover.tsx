import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUpload } from '@/hooks/useUpload'
import { useDropzone } from 'react-dropzone'

type Props = {
  initialImage: string
  onChange: (image: string) => void
}

export const EditUserCover = ({ initialImage, onChange }: Props) => {
  const { onDrop, loading } = useUpload(initialImage, onChange)
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
    <div className="col-span-2 grid gap-2">
      <Label>
        Cover <span className="text-muted-foreground text-xs">(1200x280)</span>
      </Label>
      <Input
        type="text"
        placeholder="Upload a cover"
        value={initialImage}
        onChange={(e) => onChange(initialImage)}
        disabled={loading}
        {...getRootProps()}
      />
      <input {...getInputProps()} />
    </div>
  )
}
