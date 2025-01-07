'use client'
import { LoadingIcon } from '@/components/icons'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

type Props = {
  id: string
}

const deleteCollection = async (id: string) => {
  const res = await fetch(`/api/collections/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

export const DeleteCollection = ({ id }: Props) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const onSubmit = async () => {
    startTransition(async () => {
      await deleteCollection(id)
      toast.success('Collection deleted successfully!')
      router.push('/profile')
    })
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={onSubmit}
      className="ml-auto flex items-center gap-2 p-2 text-rose-500 text-xs transition-all hover:text-rose-700"
    >
      {pending && <LoadingIcon className="size-3 fill-current" />}
      Delete Collection
    </button>
  )
}
