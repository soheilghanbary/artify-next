import { getToken } from '@/helpers/token'
import { NavigationBar } from './NavigationBar'

export default async () => {
  const token = await getToken()
  return <NavigationBar isSigned={!!token} />
}
