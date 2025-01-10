import { ProductsLoader } from '@/components/features/ProductList/ProductListLoader'
import { LikedProducts } from '@/components/features/profile/LikedProducts'
import { UserAbout } from '@/components/features/profile/UserAbout'
import { UserProducts } from '@/components/features/profile/UserProducts'
import {
  FavouriteIcon,
  GridViewIcon,
  LoadingIcon,
  User01Icon,
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '@/server/lib/auth'
import { getUserById } from '@/services/user.service'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export default async () => {
  const session = await auth()
  const user = await getUserById(session?.user?.id!)

  if (!user) notFound()

  return (
    <div className="mx-auto max-w-screen-xl md:py-8">
      <div className="mb-4 flex flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-6 md:text-left">
        <Image
          draggable={false}
          src={user.image}
          alt={user.name}
          width={100}
          height={100}
          quality={100}
          sizes="100px"
          className="size-28 rounded-full object-cover md:size-32"
        />
        <div>
          <h1 className="font-bold text-sm/6 md:text-xl">{user.name}</h1>
          <p className="text-foreground/75 text-xs/5 md:text-sm/6">
            {user.title}
          </p>
          <Button asChild className="mt-2" variant={'outline'} size={'sm'}>
            <Link href={'/settings'}>Settings</Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="products">
        <TabsList className="mb-4 flex w-fit items-center justify-center">
          <TabsTrigger value="products">
            <GridViewIcon className="mr-2 size-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="liked">
            <FavouriteIcon className="mr-2 size-4" />
            Liked
          </TabsTrigger>
          <TabsTrigger value="about">
            <User01Icon className="mr-2 size-4" />
            About
          </TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Suspense fallback={<ProductsLoader cols={3} />}>
            <UserProducts id={user.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="liked">
          <LikedProducts id={user.id} />
        </TabsContent>
        <TabsContent value="about">
          <Suspense fallback={<LoadingIcon className="mx-auto my-12 size-6" />}>
            <UserAbout {...user} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
