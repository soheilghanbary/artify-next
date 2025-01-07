'use client'
import { incrementViewProduct } from '@/services/products.service'
import { useParams } from 'next/navigation'
import { useEffect, useTransition } from 'react'

export const ProductIncrementView = () => {
  const params = useParams() as { id: string }
  const [_, startTransition] = useTransition()

  useEffect(() => {
    // Set a timeout to delay the API call
    const timer = setTimeout(() => {
      startTransition(() => {
        incrementViewProduct(params.id)
      })
    }, 3000)

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer)
  }, [params.id, startTransition])

  return null
}
