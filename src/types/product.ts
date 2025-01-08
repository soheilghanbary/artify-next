type ProductProps = {
  id: string
  title: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
  view: number
  tags: string[]
  likes: { userId: string }[]
  categoryId?: null
  category: {
    id: string
    name: string
  }
  user: {
    id: string
    image: string
    name: string
    title: string
  }
}
