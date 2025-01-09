interface Comment {
  id: string
  text: string
  userId: string
  productId: string
  createdAt: Date
  updatedAt: Date
  user: {
    name: string
    image: string
    username: string
  }
}
