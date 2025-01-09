import { getLikedProducts } from '@/services/likes.service'
import { ProductList } from '../product-list'

type Props = {
  id: string
}

export const LikedProducts = async ({ id }: Props) => {
  const products = await getLikedProducts(id)
  return (
    <ProductList
      cols={3}
      hideAuthor
      items={products}
      cardOptions={{ showTitle: true }}
    />
  )
}
