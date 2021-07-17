import { Modal } from "@chakra-ui/react"
import { ModalProps } from "@chakra-ui/modal/dist/types/modal"

export interface UnCloseableModalProps
  extends Omit<
    ModalProps,
    | "size"
    | "isCentered"
    | "autoFocus"
    | "blockScrollOnMount"
    | "closeOnEsc"
    | "closeOnOverlayClick"
  > {}

export const UnCloseableModal = ({ children, ...props }: UnCloseableModalProps) => {
  return (
    <Modal
      size="md"
      isCentered
      autoFocus
      blockScrollOnMount
      closeOnEsc={false}
      closeOnOverlayClick={false}
      {...props}
    >
      {children}
    </Modal>
  )
}
