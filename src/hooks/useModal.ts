import { useCallback, useState } from 'react'

export const useModal = () => {
  const [open, setOpen] = useState(false)

  const openModal = useCallback(() => {
    setOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setOpen(false)
  }, [])

  const toggleModal = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  return {
    open,
    openModal,
    closeModal,
    toggleModal,
  }
}
