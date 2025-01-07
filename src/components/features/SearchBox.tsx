'use client'
import { useQueryState } from 'nuqs'
import { useRef, useState } from 'react'
import { Search01Icon } from '../icons'
import { Input } from '../ui/input'

export const SearchBox = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useQueryState('q')
  const [text, setText] = useState(query || '')

  return (
    <div className="relative mt-4 flex w-full max-w-md items-center gap-4">
      <Search01Icon className="absolute left-4 size-4 text-foreground/65" />
      <Input
        type="text"
        placeholder="Search by title or description"
        className="h-12 w-full rounded-full bg-muted/40 pl-11 text-sm transition-all placeholder:text-foreground/65 focus-visible:ring-primary/40"
        value={text}
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            inputRef.current?.blur()
            if (!text) {
              setQuery(null)
              return
            }
            setQuery(text)
          }
        }}
      />
    </div>
  )
}
