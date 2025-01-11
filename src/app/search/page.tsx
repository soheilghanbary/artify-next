'use client'
import { SearchProductList } from '@/components/features/ProductList'
import { SearchField } from '@/components/features/search-field'
import { cn } from '@/lib/utils'
import { useQueryState } from 'nuqs'
import { Suspense } from 'react'

const colorMap = {
  rose: {
    bg: 'text-rose-400',
    icon: 'text-rose-400',
    ring: 'ring-rose-400',
  },
  blue: {
    bg: 'text-blue-400',
    icon: 'text-blue-400',
    ring: 'ring-blue-400',
  },
  green: {
    bg: 'text-green-400',
    icon: 'text-green-400',
    ring: 'ring-green-400',
  },
  purple: {
    bg: 'text-purple-400',
    icon: 'text-purple-400',
    ring: 'ring-purple-400',
  },
  cyan: {
    bg: 'text-cyan-400',
    icon: 'text-cyan-400',
    ring: 'ring-cyan-400',
  },
  teal: {
    bg: 'text-teal-400',
    icon: 'text-teal-400',
    ring: 'ring-teal-400',
  },
  emerald: {
    bg: 'text-emerald-400',
    icon: 'text-emerald-400',
    ring: 'ring-emerald-400',
  },
  amber: {
    bg: 'text-amber-400',
    icon: 'text-amber-400',
    ring: 'ring-amber-400',
  },
  violet: {
    bg: 'text-violet-400',
    icon: 'text-violet-400',
    ring: 'ring-violet-400',
  },
  slate: {
    bg: 'text-slate-400',
    icon: 'text-slate-400',
    ring: 'ring-slate-400',
  },
}

const CategoryCard = ({
  icon: Icon,
  title,
  color,
}: { icon: any; title: string; color: keyof typeof colorMap }) => {
  const { bg, icon, ring } = colorMap[color]

  return (
    <div
      className={cn(
        'relative grid min-h-28 cursor-pointer gap-2 rounded-2xl border border-dashed bg-muted/40 p-4 shadow ring-ring ring-offset-2 ring-offset-background transition-all hover:ring-4 active:scale-95',
        bg,
        ring
      )}
    >
      <Icon className={cn('absolute top-4 right-4 ml-auto size-10', icon)} />
      <h2 className="mt-auto font-black text-lg">{title}</h2>
    </div>
  )
}

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
    <div className="relative flex flex-col items-center justify-center px-4 py-6">
      <h1 className="motion-preset-fade-sm text-center font-black text-3xl/tight tracking-tight md:text-5xl/tight">
        Search any Products
      </h1>
      <SearchField />
    </div>
  )
}
