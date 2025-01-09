import { getUserProducts } from '@/services/products.service'
import { ProductList } from '../product-list'

type Props = {
  id: string
}

export const UserProducts = async ({ id }: Props) => {
  const products = await getUserProducts(id)
  return (
    <ProductList
      cols={3}
      hideAuthor
      cardOptions={{ showTitle: true }}
      items={products}
    />
  )
}
