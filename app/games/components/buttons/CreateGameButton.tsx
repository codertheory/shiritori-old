import { Button, ButtonProps } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

export interface CreateGameButtonProps
  extends Omit<ButtonProps, "onClick" | "isLoading" | "loadingText"> {
  isPublic: boolean
}

export const CreateGameButton = ({ isPublic, children, ...props }: CreateGameButtonProps) => {
  const {
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useFormContext()

  const privateValue = getValues("private") ?? false

  return (
    <Button
      type="submit"
      rounded={"full"}
      isLoading={isSubmitting && privateValue === isPublic}
      loadingText="Submitting"
      onClick={() => {
        setValue("private", !isPublic)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}
