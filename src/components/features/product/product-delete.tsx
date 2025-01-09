'use client'
import { LoadingIcon } from '@/components/icons'
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
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/services/products.service'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

type Props = {
  id: string
}

export const ProductDelete = ({ id }: Props) => {
  const router = useRouter()
  const [pending, mutate] = useTransition()

  const onSubmit = () => {
    mutate(async () => {
      const res = await deleteProduct(id)
      toast.success(res.message)
      router.push('/profile')
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'link'} className="text-foreground">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to permanently delete this product? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={pending} onClick={onSubmit}>
            {pending && <LoadingIcon className="size-4 fill-primary" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
