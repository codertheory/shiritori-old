import { useToast } from "@chakra-ui/react"

export const useErrorToast = (onClose?: () => void, id: string = "error-toast") => {
  const toast = useToast()

  return (error: { message: string }) => {
    if (!toast.isActive(id))
      toast({
        id: id,
        title: "An error occurred.",
        description: `${error.message}`,
        status: "error",
        duration: 6000,
        isClosable: true,
        onCloseComplete: onClose,
      })
  }
}
