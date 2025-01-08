type ProductProps = {
  id: string
  title: string
  description: string
  image: string
  collectionId?: string;
  createdAt: Date
  updatedAt: Date
  tags: string[]
  user: {
    id: string
    image: string
    name: string
    title: string
  }
  collections: Array<{
    id: string
    name: string
  }>
}