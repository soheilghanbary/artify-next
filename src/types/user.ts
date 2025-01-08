interface User {
  id: string
  name: string
  email: string
  image: string
  cover: string
  emailVerified: string | null
  createdAt: Date
  title: string
  bio: string
  portfolio: string
  instagram: string
  twitter: string
  github: string
  linkedin: string
}

type UserProps = {
  id: string
  name: string
  email: string
  image: string
  emailVerified: string | null
  createdAt: string
  title: string
  bio: string
  portfolio: string
  instagram: string
  twitter: string
  github: string
  linkedin: string
}
