import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useUserCollections = () => {
  return useQuery({
    queryKey: ['collections'],
    queryFn: () => fetch('/api/collections/user').then((res) => res.json()),
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  })
}

export const useCreateCollection = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (data: any) =>
      fetch('/api/collections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSettled() {
      qc.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}

export const useDeleteCollection = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/collections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json()),
    onSettled() {
      qc.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}

export const useUpdateCollection = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      fetch(`/api/collections/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSettled() {
      qc.invalidateQueries({ queryKey: ['collections'] })
    },
  })
}
