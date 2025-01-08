import { getUserProfile } from '@/services/auth.service'
import { useQuery } from '@tanstack/react-query'

export const useUserById = (id: string) => {
  return useQuery<UserProps, Error>({
    queryKey: ['user', id],
    queryFn: () => fetch(`/api/users/${id}`).then((res) => res.json()),
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useUserProfile = () => {
  return useQuery<any, Error>({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    refetchOnMount: false,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}
