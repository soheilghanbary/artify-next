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

export function ProductLike({ productId, userId, hasLiked }: Props) {
  const [liked, setLiked] = useState(hasLiked)
  const [pending, mutate] = useTransition()

  const onSubmit = () => {
    mutate(async () => {
      const res = await toggleLike(productId, userId)
      setLiked(res.liked)
    })
  }

  return (
    <>
      {hasLiked.toString()}
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
    </>
  )
}
