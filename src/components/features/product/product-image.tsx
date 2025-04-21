'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  src: string
  alt: string
}

export const ProductImage = (props: Props) => {
  const [loaded, setLoaded] = useState(false)
  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-xl">
      <Image
        fill
        priority
        quality={100}
        draggable={false}
        className={cn(
          'size-full rounded-[inherit] border bg-muted/40 object-cover duration-500',
          !loaded && 'blur-md grayscale-0'
        )}
        onLoad={() => setLoaded(true)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </figure>
  )
}
