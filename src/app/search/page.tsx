'use client'
import { SearchProductList } from '@/components/features/ProductList'
import { SearchBox } from '@/components/features/SearchBox'
import { useQueryState } from 'nuqs'
import { Suspense } from 'react'

export default () => {
  return (
    <Suspense>
      <Hero />
      <SearchProducts />
    </Suspense>
  )
}

const SearchProducts = () => {
  const [query] = useQueryState('q')
  return query && <SearchProductList />
}

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 py-12">
      <h1 className="motion-preset-fade-sm text-center font-black text-3xl/tight tracking-tight md:text-5xl/tight">
        Search any Products
      </h1>
      <SearchBox />
    </div>
  )
}
