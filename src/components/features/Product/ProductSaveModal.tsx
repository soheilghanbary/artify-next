'use client'

import { BookmarkAdd02Icon, LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { getUserCollections } from '@/services/collections.service'
import { addToCollection } from '@/services/products.service'
import { useQuery } from '@tanstack/react-query'
import { FolderIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

type Props = {
  id: string
  userId: string
  initialCollectionId?: string
}

const TriggerButton = (
  <Button variant={'outline'} size={'icon'}>
    <BookmarkAdd02Icon className="text-indigo-600 dark:text-indigo-300" />
  </Button>
)

export const ProductSaveModal = ({
  id: productId,
  initialCollectionId,
  userId,
}: Props) => {
  const [pending, mutate] = useTransition()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { data: collections, isPending } = useQuery({
    queryKey: ['collections'],
    queryFn: () => getUserCollections(userId),
  })

  const onSubmit = (collectionId: string) => {
    mutate(async () => {
      const res = await addToCollection(productId, collectionId)
      setOpen(false)
      toast.success(res.message)
    })
  }

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{TriggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Product</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {isPending ? (
          <LoadingIcon className="mx-auto my-6 size-5 fill-primary" />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {collections?.length ? (
              collections?.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  className={cn(
                    'cursor-pointer rounded-lg border p-4 ring-primary transition-all disabled:opacity-50',
                    c.id === initialCollectionId
                      ? 'bg-muted'
                      : 'hover:ring-2 active:scale-95'
                  )}
                  disabled={c.id === initialCollectionId}
                  onClick={() => onSubmit(c.id)}
                >
                  <p className="font-semibold text-sm/6">
                    {i + 1}. {c.name}
                  </p>
                  <p className="line-clamp-1 text-foreground/75 text-xs/6">
                    {c.description}
                  </p>
                </button>
              ))
            ) : (
              <div className="col-span-2 flex h-40 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed">
                <FolderIcon className="size-5" />
                <p className="font-medium text-xs">Collection List is Empty</p>
              </div>
            )}
          </div>
        )}
        {initialCollectionId && (
          <button
            type="button"
            disabled={pending}
            onClick={() => onSubmit('')}
            className="flex items-center gap-2 p-2 text-rose-500 text-xs transition-all hover:text-rose-700"
          >
            {/* {pending && <LoadingIcon className="size-3 fill-current" />} */}
            Remove
          </button>
        )}
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{TriggerButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Save Product</DrawerTitle>
          <DrawerDescription />
        </DrawerHeader>
        <div className="px-4">
          {isPending && (
            <LoadingIcon className="mx-auto my-6 size-5 fill-primary" />
          )}
          <div className="grid gap-2">
            {!isPending || collections
              ? collections?.map((c, i) => (
                  <button
                    key={c.id}
                    type="button"
                    className={cn(
                      'flex cursor-pointer flex-col items-start rounded-lg border p-4 ring-primary transition-all hover:ring-2 active:scale-95',
                      c.id === initialCollectionId && 'bg-muted'
                    )}
                    onClick={() => onSubmit(c.id)}
                  >
                    <p className="font-semibold text-sm/6">
                      {i + 1}. {c.name}
                    </p>
                    <p className="line-clamp-1 text-foreground/75 text-xs/6">
                      {c.description}
                    </p>
                  </button>
                ))
              : null}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
