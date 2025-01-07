'use client'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const ProductSearch = () => {
  const params = useParams() as { q: string }
  const router = useRouter()
  const [query, setQuery] = useState(params.q || '')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.length) return router.push('/')
    const formattedValue = query.trim().replace(/\s+/g, '-')
    router.push(`/search/${formattedValue}`)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <form
      className="relative ml-auto flex w-full max-w-xs items-center gap-2"
      onSubmit={handleSubmit}
    >
      <SearchIcon className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 shrink-0 text-muted-foreground/65" />
      <Input
        type="text"
        value={query}
        className="w-full flex-1 rounded-full bg-muted/50 pl-9 focus:bg-background"
        placeholder="ex: SaaS Landing Page"
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
      />
    </form>
  )
}
