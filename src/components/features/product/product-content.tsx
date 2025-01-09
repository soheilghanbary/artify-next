import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { fromNow } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  description: string
  createdAt: Date
  view: number
  tags: string[]
  category: {
    id: string
    name: string
  }
}

export const ProductContent = ({
  description,
  createdAt,
  view,
  tags,
  category,
}: Props) => {
  return (
    <>
      {!!category && (
        <Badge variant={'secondary'} className="w-fit">
          {category.name}
        </Badge>
      )}
      <h2 className="font-bold text-base md:text-2xl">Description</h2>
      <div
        className="text-foreground/85 text-xs/6 md:text-base/7 [&_a]:font-bold [&_a]:text-primary [&_a]:underline [&_a]:decoration-wavy-offset-4 [&_a]:decoration-wavy [&_a]:underline-offset-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="flex items-center gap-4">
        <p className="text-foreground/85 text-xs/5">
          Published {fromNow(createdAt)}
        </p>
        <Separator orientation="vertical" className="h-3" />
        <p className="text-foreground/85 text-xs/5">{view} views</p>
      </div>
      {!!tags.length && (
        <>
          <h2 className="font-semibold text-sm">Tags</h2>
          <div className="inline-flex flex-wrap items-center gap-1">
            {tags.map((tag) => (
              <Link key={tag} href={`/search?q=${tag}`}>
                <Badge variant={'secondary'}>{tag}</Badge>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
}
