import { uploadFile } from '@/lib/aws'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'

export const useUpload = (
  initialImage: string,
  onChange: (image: string) => void
) => {
  const [path, setPath] = useState<string>(initialImage)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = useCallback(
    async (file: File) => {
      setLoading(true)
      toast.loading('Uploading...', { id: 'toast-loading' })
      try {
        const uploadedImage = await uploadFile(file)
        onChange(uploadedImage.Location)
        setLoading(false)
        toast.success('Uploaded successfully', { id: 'toast-loading' })
      } catch (error) {
        setLoading(false)
        toast.error('Upload failed', { id: 'toast-loading' })
        console.error('Upload failed:', error)
      }
    },
    [onChange]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setPath(URL.createObjectURL(file))
        handleImageUpload(file)
      }
    },
    [handleImageUpload]
  )

  return {
    path,
    setPath,
    onDrop,
    loading,
  }
}
