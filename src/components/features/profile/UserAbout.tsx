import { Calendar03Icon } from '@/components/icons'
import { Separator } from '@/components/ui/separator'
import { fromNow } from '@/lib/utils'
import { SocialLinks } from './SocialLinks'

type Props = {
  bio: string
  createdAt: Date
  instagram: string
  twitter: string
  github: string
  linkedin: string
  portfolio: string
}

export const UserAbout = (props: Props) => {
  return (
    <div className="grid gap-2">
      <h2 className="font-semibold text-xl">Biography</h2>
      <div
        className="text-foreground/75 text-xs/6 sm:text-sm/6 [&_p:last-child]:mb-0 [&_p]:mb-2"
        dangerouslySetInnerHTML={{ __html: props.bio }}
      />
      <Separator className="my-2" />
      <p className="mb-4 flex items-center gap-1.5 text-xs">
        <Calendar03Icon className="size-4 text-current" />
        {fromNow(props.createdAt)}
      </p>
      <h2 className="font-semibold text-xl">Social</h2>
      <SocialLinks links={{ ...props }} />
    </div>
  )
}
