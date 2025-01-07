import { BadgePlus } from 'lucide-react'
import type { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const AddCollectionTrigger = ({ className, ...props }: Props) => {
  return (
    <button
      type="button"
      className={`flex min-h-40 flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-4 font-medium text-foreground/75 shadow-sm ring-primary transition-all hover:ring-2 active:scale-95 ${className || ''}
      `}
      aria-label="Add new collection"
      {...props}
    >
      <BadgePlus className="size-5" />
      <span>New Collection</span>
    </button>
  )
}
