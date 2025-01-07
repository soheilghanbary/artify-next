'use client'
import { TextLine } from '@/components/common/text-line'
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
import { LogInIcon } from 'lucide-react'
import { OAuth } from './OAuth'

const Trigger = (
  <Button fullRounded>
    <LogInIcon />
    Sign in
  </Button>
)

type Props = {
  initialTrigger?: React.ReactNode
}

export function AuthModal({ initialTrigger }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{initialTrigger || Trigger}</DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Sign In your Account</DialogTitle>
            <DialogDescription>to use more features</DialogDescription>
          </DialogHeader>
          <TextLine text="Sign In with" />
          <OAuth />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{initialTrigger || Trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sign In your Account</DrawerTitle>
          <DrawerDescription>to use more features</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 px-4">
          <TextLine text="Sign In with" />
          <OAuth />
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
