'use client'
import { LoadingIcon } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { fromNow } from '@/lib/utils'
import { getComments } from '@/services/comments.service'
import { useQuery } from '@tanstack/react-query'

type Props = {
  id: string
}

const CommentItem = (c: Comment) => {
  return (
    <div className="flex gap-3">
      <img
        src={c.user.image}
        alt={c.user.name}
        className="size-8 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-medium text-sm/6">{c.user.name}</h2>
          <Separator orientation="vertical" className="h-3" />
          <p className="text-[10px]/6 text-foreground/85">
            {fromNow(c.createdAt)}
          </p>
        </div>
        <p className="text-foreground/85 text-xs/6">{c.text}</p>
      </div>
    </div>
  )
}

export const CommentList = ({ id }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getComments(id),
  })

  if (isPending) return <LoadingIcon className="mx-auto my-6 size-7" />
  if (!data) return <p>comments not found</p>

  return (
    <div className="mt-2 grid gap-4">
      {data.map((c) => (
        <CommentItem key={c.id} {...c} />
      ))}
    </div>
  )
}
