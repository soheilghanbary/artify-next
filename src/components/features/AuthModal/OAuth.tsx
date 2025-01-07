'use client'
import { GoogleIcon, LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { onSignIn } from '@/server/actions/auth.action'
import { useTransition } from 'react'

export const OAuth = () => {
  const [pending, startTransition] = useTransition()

  const handleLogin = async (provider: 'google' | 'github') => {
    startTransition(async () => {
      await onSignIn(provider)
    })
  }

  return (
    <Button
      name="google"
      className="w-full"
      variant={'secondary'}
      disabled={pending}
      onClick={() => handleLogin('google')}
    >
      {pending ? <LoadingIcon className="fill-primary" /> : <GoogleIcon />}
      Sign In with Google
    </Button>
  )
}
