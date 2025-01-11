'use client'
import { FilterIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useQueryState } from 'nuqs'

export const ProductFilter = () => {
  const [_, setFilter] = useQueryState('filter')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className="select-none">
          <FilterIcon />
          Sort By
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => setFilter('viewest')}>
          Viewest
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setFilter('newest')}>
          Newest
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
