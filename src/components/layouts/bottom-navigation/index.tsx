import { auth } from '@/server/lib/auth'
import { NavigationBar } from './NavigationBar'

export default async () => {
  const session = await auth()
  return <NavigationBar isSigned={!!session} />
}
