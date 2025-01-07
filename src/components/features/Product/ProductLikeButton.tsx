'use client'
import { FavouriteIcon, LoadingIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { checkLike, createLike } from '@/services/likes.service'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useTransition } from 'react'

type Props = {
  id: string
}

export function ProductLikeButton({ id }: Props) {
  const [pending, mutate] = useTransition()
  const qc = useQueryClient()
  const { data: liked, isLoading } = useQuery({
    queryKey: ['liked', id],
    queryFn: () => checkLike(id),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })

  const onSubmit = () => {
    mutate(async () => {
      const res = await createLike(id)
      await qc.cancelQueries()
      qc.setQueryData(['liked', id], res.liked)
    })
  }

  return (
    <Button
      size={'icon'}
      variant={'outline'}
      onClick={onSubmit}
      className={pending || isLoading ? 'opacity-50' : ''}
    >
      {isLoading ? (
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
