'use client'
import { X } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { useRef, useState } from 'react'
import { Search01Icon } from '../icons'
import { Input } from '../ui/input'

export const SearchField = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useQueryState('q')
  const [text, setText] = useState(query || '')

  return (
    <div className="relative flex grow items-center gap-4 md:w-60 md:grow-0">
      <Search01Icon className="absolute left-4 size-4 text-foreground/65" />
      <Input
        type="text"
        placeholder="e.g: Logo"
        className="w-full bg-muted/40 pl-11 text-sm transition-all placeholder:text-foreground/65 focus-visible:ring-primary/40"
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
      {!!text && (
        <button
          type="button"
          className="-translate-y-1/2 absolute top-1/2 right-3 text-foreground/50 transition-all hover:text-foreground/70 active:text-foreground/90"
          onClick={() => {
            setQuery(null)
            setText('')
          }}
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  )
}
