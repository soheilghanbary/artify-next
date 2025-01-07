'use client'
import { setToken } from '@/helpers/token'
import { useEffect, useTransition } from 'react'

export const SetTokenCookie = () => {
  const [_, mutate] = useTransition()
  const searchParams = new URLSearchParams(window.location.search)
  const token = searchParams.get('token') as string

  useEffect(() => {
    if (!token) return
    mutate(async () => {
      await setToken(token)
      window.location.href = '/'
    })
  }, [])

  return null
}
