'use client'

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
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useModal } from '@/hooks/useModal'
import { AddCollectionForm } from './AddCollectionForm'
import { AddCollectionTrigger } from './AddCollectionTrigger'

type Props = {
  userId: string
}

export const AddCollectionModal = ({ userId }: Props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { open, toggleModal, closeModal } = useModal()

  return isDesktop ? (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <AddCollectionTrigger />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new collection</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </DialogDescription>
        </DialogHeader>
        <AddCollectionForm userId={userId} onClose={closeModal} />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <AddCollectionTrigger />
      </DialogTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new collection</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <AddCollectionForm userId={userId} onClose={closeModal} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
