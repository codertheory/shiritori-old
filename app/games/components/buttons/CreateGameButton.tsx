import { Button, ButtonProps } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"
import { useState } from "react"

export interface CreateGameButtonProps
  extends Omit<ButtonProps, "onClick" | "isLoading" | "loadingText"> {
  isPublic: boolean
}

export const CreateGameButton = ({ isPublic, children, ...props }: CreateGameButtonProps) => {
  const {
    setValue,
    formState: { isSubmitting },
  } = useFormContext()
  const [privateValue] = useState<string>("")

  return (
    <Button
      type="submit"
      rounded={"full"}
      isLoading={isSubmitting && privateValue === "true"}
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
