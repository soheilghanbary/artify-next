import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { UserProducts } from '@/components/features/profile/UserProducts'
import { getUserById } from '@/services/user.service'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type Props = {
  params: Promise<{ id: string }>
}

export default async ({ params }: Props) => {
  const { id } = await params
  const user = await getUserById(id)
  if (!user) return notFound()

  return (
    <div className="mx-auto max-w-screen-xl">
      <div className="-z-10 relative mx-auto flex aspect-[12/3] items-end justify-center rounded-3xl bg-muted/40">
        <Image
          fill
          sizes="400px"
          alt="cover"
          className="aspect-[inherit] size-full rounded-[inherit] object-cover"
          src={user.cover}
        />
      </div>
      <div className="-mt-14 z-10 flex flex-col items-center gap-1 text-center">
        <Image
          draggable={false}
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          quality={100}
          sizes="100px"
          className="size-[100px] rounded-full border-8 border-background bg-muted object-cover"
        />
        <div>
          <h1 className="font-bold text-xl">{user.name}</h1>
          <p className="text-foreground/85 text-sm/6">{user.title}</p>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-3">
        <h2 className="font-bold text-lg md:text-2xl">Products</h2>
        <Suspense fallback={<ProductsLoader cols={3} />}>
          <UserProducts id={id} />
        </Suspense>
      </div>
    </div>
  )
}
