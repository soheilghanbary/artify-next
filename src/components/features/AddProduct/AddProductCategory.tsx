import { LoadingIcon } from '@/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getAllCategories } from '@/services/categories.service'
import { useQuery } from '@tanstack/react-query'

type Props = {
  value: string
  onValueChange: (value: string) => void
}

export const AddProductCategory = ({ value, onValueChange }: Props) => {
  const { data, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {isPending ? (
          <LoadingIcon className="mx-auto my-6 size-5 fill-primary" />
        ) : (
          data?.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
