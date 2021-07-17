import { Button, ButtonProps } from "@chakra-ui/react"

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button type="submit" rounded={"full"} loadingText="Submitting" colorScheme="teal" {...props}>
      {children}
    </Button>
  )
}
