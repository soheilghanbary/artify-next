'use client'
import { LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { onSignOut } from '@/server/actions/auth.action'
import { LogOutIcon } from 'lucide-react'
import { useTransition } from 'react'

export default function SettingsAccount() {
  const [pending, mutate] = useTransition()

  const onSubmit = async () => {
    mutate(async () => {
      await onSignOut()
    })
  }

  return (
    <div className="mx-auto max-w-2xl rounded-lg border bg-muted/40">
      <div className="border-b p-4">
        <h1 className="font-bold text-2xl/normal">Account Settings</h1>
        <p className="text-foreground/75 text-xs/6 md:text-sm/6">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="p-4">
        <Button disabled={pending} onClick={onSubmit} variant={'destructive'}>
          {pending ? <LoadingIcon className="fill-current" /> : <LogOutIcon />}
          Sign Out
        </Button>
      </div>
    </div>
  )
}
