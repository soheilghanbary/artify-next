import Image from 'next/image'
import Link from 'next/link'

type Props = {
  image: string
  name: string
}

export const UserProfile = ({ name, image }: Props) => {
  return (
    <Link href={'/profile'}>
      <Image
        draggable={false}
        loading="lazy"
        src={image}
        alt={name}
        width={40}
        height={40}
        quality={100}
        sizes="80px"
        className="size-10 rounded-full bg-muted ring-2 ring-primary/10 ring-offset-2 ring-offset-background transition-all hover:ring-primary/30 active:scale-95 active:ring-background"
      />
    </Link>
  )
}
