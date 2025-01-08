'use client'
import { FavouriteIcon, LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toggleLike } from '@/services/likes.service'
import { useState, useTransition } from 'react'

type Props = {
  productId: string
  userId: string
  hasLiked: boolean
}

export function ProductLikeButton({ productId, userId, hasLiked }: Props) {
  const [liked, setLiked] = useState(hasLiked)
  const [pending, mutate] = useTransition()

  const onSubmit = () => {
    setLiked(!liked)
    mutate(async () => {
      await toggleLike(productId, userId)
    })
  }

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      onClick={onSubmit}
      disabled={pending}
      className={pending ? 'opacity-50' : ''}
    >
      {pending ? (
        <LoadingIcon className="fill-rose-500" />
      ) : (
        <FavouriteIcon
          className={cn(
            'motion-preset-expand text-rose-500',
            liked && 'motion-preset-expand fill-rose-500'
          )}
        />
      )}
    </Button>
  )
}
