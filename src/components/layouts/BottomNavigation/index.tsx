import { getToken } from '@/helpers/token'
import { NavigationBar } from './NavigationBar'
import { auth } from '@/server/lib/auth'

export default async () => {
  const session = await auth()
  return <NavigationBar isSigned={!!session} />
}
