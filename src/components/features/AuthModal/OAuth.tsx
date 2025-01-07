'use client'
import { GoogleIcon, LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import type React from 'react'
import { useEffect, useState } from 'react'

export const OAuth = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const [loading, setLoading] = useState({
    google: false,
  })

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    const provider = e.currentTarget.name as 'google'
    setLoading((prev) => ({ ...prev, [provider]: true }))
    window.location.href = `/api/auth/${provider}`
  }

  useEffect(() => {
    console.log(searchParams.get('token'))
  }, [])

  return (
    <Button
      name="google"
      className="w-full"
      variant={'secondary'}
      onClick={handleLogin}
      disabled={loading.google}
    >
      {loading.google ? (
        <LoadingIcon className="fill-primary" />
      ) : (
        <GoogleIcon />
      )}
      Google
    </Button>
  )
}
