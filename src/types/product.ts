type ProductProps = {
  id: string
  title: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    image: string
    name: string
  }
  collections: Array<{
    id: string
    name: string
  }>
}