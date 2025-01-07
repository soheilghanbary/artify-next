'use client'
import { useEffect } from 'react'

export const ScrollTop = () => {
  useEffect(() => {
    return window.scrollTo(0, 0)
  }, [])

  return null
}
